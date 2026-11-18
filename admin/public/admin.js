/* Beengo Study — админ-панель статей */
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const CATS = { admission: 'Поступление', programs: 'Программы', docs: 'Документы', life: 'Жизнь в Китае', grants: 'Стипендии' };
const CATS_EN = { admission: 'Admission', programs: 'Programs', docs: 'Documents', life: 'Life in China', grants: 'Scholarships' };
const CAT_COLORS = { admission: ['#e6f0ff', '#1a5fd1'], programs: ['#ffe9d6', '#b5400e'], docs: ['#fff4c7', '#8a6200'], life: ['#ffe2dc', '#b8261c'], grants: ['#e3e8f6', '#1f3a7a'] };
let ME = null;

// ---------- запросы к серверу
async function api(method, url, body) {
  const r = await fetch(url, { method, credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Beengo': '1' }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (r.status === 401 && url !== '/api/login') { showLogin(); throw new Error('Нужно войти заново'); }
  if (!r.ok) throw new Error(j.error || ('Ошибка ' + r.status));
  return j;
}
function toast(t, kind) {
  const d = document.createElement('div'); d.className = 'toast ' + (kind || ''); d.textContent = t;
  $('#toasts').appendChild(d); setTimeout(() => d.remove(), kind === 'err' ? 6000 : 3000);
}
function escH(s) { return String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function fmtDate(iso) { if (!iso) return ''; const d = new Date(iso); return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }); }
function busy(btn, on) { if (btn) btn.classList.toggle('busy', on); }

// окно ввода
function ask(title, text, value, placeholder) {
  return new Promise(res => {
    const d = $('#dlg'); $('#dlgTitle').textContent = title; $('#dlgText').textContent = text || '';
    const inp = $('#dlgInput'); inp.hidden = value === null; inp.value = value || ''; inp.placeholder = placeholder || '';
    d.returnValue = ''; d.showModal(); if (!inp.hidden) setTimeout(() => inp.focus(), 30);
    d.addEventListener('close', () => res(d.returnValue === 'ok' ? (inp.hidden ? true : inp.value.trim()) : null), { once: true });
  });
}

// ---------- безопасный HTML (вставка из буфера и ответы ИИ)
const OK_TAGS = { P: 'p', H1: 'h2', H2: 'h2', H3: 'h3', H4: 'h3', UL: 'ul', OL: 'ol', LI: 'li', STRONG: 'strong', B: 'strong', EM: 'em', I: 'em', U: 'u', BLOCKQUOTE: 'blockquote', BR: 'br', A: 'a', IMG: 'img', DIV: 'p' };
function cleanHtml(html) {
  const doc = new DOMParser().parseFromString('<body>' + html + '</body>', 'text/html');
  const walk = (node, out) => {
    for (const n of [...node.childNodes]) {
      if (n.nodeType === 3) { out.appendChild(document.createTextNode(n.nodeValue)); continue; }
      if (n.nodeType !== 1) continue;
      const tag = OK_TAGS[n.tagName];
      if (/^(SCRIPT|STYLE|IFRAME|OBJECT|SVG|TEMPLATE)$/.test(n.tagName)) continue;
      if (!tag) { walk(n, out); continue; }
      const el = document.createElement(tag);
      if (tag === 'a') { const h = n.getAttribute('href') || ''; if (/^(https?:|mailto:|tel:|\/|#)/i.test(h)) el.setAttribute('href', h); }
      if (tag === 'img') { const s = n.getAttribute('src') || ''; if (/^(https?:|\/)/i.test(s)) { el.setAttribute('src', s); el.setAttribute('alt', n.getAttribute('alt') || ''); } else continue; }
      walk(n, el); out.appendChild(el);
    }
  };
  const box = document.createElement('div'); walk(doc.body, box);
  // текст и «строчные» элементы верхнего уровня собираем в абзацы
  const BLOCK = /^(P|H2|H3|UL|OL|BLOCKQUOTE)$/;
  let para = null;
  for (const n of [...box.childNodes]) {
    if (n.nodeType === 1 && BLOCK.test(n.tagName)) { para = null; continue; }
    if (n.nodeType === 1 && n.tagName === 'BR') { para = null; n.remove(); continue; }
    if (n.nodeType === 3 && !n.nodeValue.trim()) { if (!para) n.remove(); else para.appendChild(n); continue; }
    if (n.nodeType === 1 && n.tagName === 'IMG') { const p = document.createElement('p'); box.insertBefore(p, n); p.appendChild(n); para = null; continue; }
    if (!para) { para = document.createElement('p'); box.insertBefore(para, n); }
    para.appendChild(n);
  }
  box.querySelectorAll('p').forEach(p => { if (!p.textContent.trim() && !p.querySelector('img')) p.remove(); });
  // текст без абзацев (например, из блокнота) — превращаем строки в абзацы
  if (!box.querySelector('p,h2,h3,ul,ol,blockquote') && box.textContent.includes('\n')) {
    return box.textContent.split(/\n{1,}/).map(s => s.trim()).filter(Boolean).map(s => '<p>' + escH(s) + '</p>').join('');
  }
  return box.innerHTML;
}
function textFromMarkdownish(t) {
  // если ИИ ответил обычным текстом — оформляем в абзацы и заголовки
  return t.split(/\n{2,}/).map(b => b.trim()).filter(Boolean).map(b => {
    const h = b.match(/^#{1,3}\s+(.*)$/); if (h) return '<h2>' + escH(h[1]) + '</h2>';
    if (/^[-•*]\s/m.test(b)) return '<ul>' + b.split('\n').map(l => '<li>' + escH(l.replace(/^[-•*]\s*/, '')) + '</li>').join('') + '</ul>';
    return '<p>' + escH(b).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>') + '</p>';
  }).join('');
}

// ---------- картинки: уменьшаем и сжимаем перед загрузкой
function toWebp(src, maxW) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, maxW / img.naturalWidth), w = Math.round(img.naturalWidth * k), h = Math.round(img.naturalHeight * k);
      const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(img, 0, 0, w, h);
      let d = c.toDataURL('image/webp', 0.86); if (!d.startsWith('data:image/webp')) d = c.toDataURL('image/jpeg', 0.88);
      res(d);
    };
    img.onerror = () => rej(new Error('Не удалось открыть картинку'));
    img.src = src;
  });
}
function readFile(f) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(f); }); }
async function uploadImage(src, maxW) { const data = await toWebp(src, maxW); return (await api('POST', '/api/upload', { data })).url; }

// ---------- вход
function showLogin() { $('#app').hidden = true; $('#login').hidden = false; }
$('#loginForm').addEventListener('submit', async e => {
  e.preventDefault(); const f = e.target; $('#loginErr').hidden = true;
  try { await api('POST', '/api/login', { user: f.user.value, pass: f.pass.value }); f.pass.value = ''; await boot(); }
  catch (er) { $('#loginErr').textContent = er.message; $('#loginErr').hidden = false; }
});
$('#logout').onclick = async () => { await api('POST', '/api/logout').catch(() => {}); showLogin(); };

async function boot() {
  try { ME = await api('GET', '/api/me'); } catch { return showLogin(); }
  $('#login').hidden = true; $('#app').hidden = false;
  $('#userName').textContent = ME.user; $('#ava').textContent = (ME.user[0] || 'A').toUpperCase();
  aiInit(); route();
}

// ---------- маршруты
let listCache = [];
async function route() {
  if (!$('#app').hidden && leaveGuard()) return;
  const h = location.hash;
  const m = h.match(/^#\/edit\/([a-z0-9-]+)/);
  if (h === '#/new') return openEditor(null);
  if (m) return openEditor(m[1]);
  showList();
}
let lastHash = location.hash;
addEventListener('hashchange', () => {
  if (editorDirty && lastHash.match(/^#\/(new|edit)/) && !location.hash.startsWith(lastHash) && !confirm('Есть несохранённые изменения. Уйти без сохранения?')) { history.replaceState(null, '', lastHash); return; }
  lastHash = location.hash; editorDirty = false; route();
});
function leaveGuard() { return false; }
addEventListener('beforeunload', e => { if (editorDirty) { e.preventDefault(); e.returnValue = ''; } });

// ---------- список статей
let statusF = 'all';
async function showList() {
  $('#viewEdit').hidden = true; $('#viewList').hidden = false; document.title = 'Статьи — админ-панель';
  try { listCache = (await api('GET', '/api/articles')).articles; } catch (e) { toast(e.message, 'err'); }
  renderList();
}
function renderList() {
  const q = $('#listSearch').value.trim().toLowerCase();
  const rows = listCache.filter(a => (statusF === 'all' || a.status === statusF) && (!q || (a.title || '').toLowerCase().includes(q)));
  $('#list').innerHTML = rows.length ? rows.map(a => {
    const th = a.cover ? `<img class="th" src="${escH(a.cover)}" alt="">` : `<div class="th cv-${a.cat}">${escH(CATS[a.cat] || '')}</div>`;
    return `<div class="li" data-id="${a.id}">${th}
      <div class="tt">${escH(a.title || 'Без заголовка')}<small>${a.en ? 'RU + EN' : 'только RU'}${a.featured ? ' · на главной' : ''}</small></div>
      <div class="ct">${escH(CATS[a.cat] || '')}</div>
      <div><span class="chip ${a.status === 'published' ? 'st-pub' : 'st-draft'}">${a.status === 'published' ? 'Опубликована' : 'Черновик'}</span></div>
      <div class="dt">${fmtDate(a.status === 'published' ? a.date : a.updated)}</div>
      <div class="acts">${a.status === 'published' ? `<a href="/article.html#${a.id}" target="_blank" rel="noopener" title="Открыть на сайте"><svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/></svg></a>` : ''}
        <button type="button" data-del="${a.id}" title="Удалить"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg></button></div></div>`;
  }).join('') : `<div class="empty">${listCache.length ? 'Ничего не найдено' : 'Статей пока нет — создайте первую'}</div>`;
}
$('#list').addEventListener('click', async e => {
  const del = e.target.closest('[data-del]');
  if (del) { e.stopPropagation(); return deleteArticle(del.dataset.del); }
  if (e.target.closest('a')) return;
  const li = e.target.closest('.li'); if (li) location.hash = '#/edit/' + li.dataset.id;
});
$('#statusFilter').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; statusF = b.dataset.s; $$('#statusFilter button').forEach(x => x.classList.toggle('on', x === b)); renderList(); });
$('#listSearch').addEventListener('input', renderList);
async function deleteArticle(id) {
  const a = listCache.find(x => x.id === id) || cur;
  if (!(await ask('Удалить статью?', `«${(a && (a.title || (a.ru && a.ru.title))) || id}» исчезнет с сайта. Это нельзя отменить.`, null))) return;
  try { await api('DELETE', '/api/articles/' + id); toast('Статья удалена', 'ok'); editorDirty = false; if (location.hash !== '#/') location.hash = '#/'; else showList(); }
  catch (e) { toast(e.message, 'err'); }
}

// ---------- редактор
let cur = null, lang = 'ru', editorDirty = false;
const blank = () => ({ id: '', cat: 'admission', status: 'draft', featured: false, cover: '', date: '', ru: { title: '', lead: '', html: '' }, en: { title: '', lead: '', html: '' } });
$('#cats').innerHTML = Object.entries(CATS).map(([k, v]) => `<button type="button" data-c="${k}">${v}</button>`).join('');

async function openEditor(id) {
  $('#viewList').hidden = true; $('#viewEdit').hidden = false;
  if (id) {
    try { cur = (await api('GET', '/api/articles/' + id)).article; } catch (e) { toast(e.message, 'err'); location.hash = '#/'; return; }
    cur.en = cur.en || { title: '', lead: '', html: '' };
  } else cur = blank();
  lang = 'ru'; editorDirty = false; fillEditor(); markSaved(id ? 'Сохранено' : '');
  scrollTo(0, 0);
}
function fillEditor() {
  $$('#langTabs button').forEach(b => b.classList.toggle('on', b.dataset.l === lang));
  $('#enMark').textContent = cur.en && cur.en.title ? '✓' : '';
  $$('#cats button').forEach(b => b.classList.toggle('on', b.dataset.c === cur.cat));
  const L = cur[lang];
  $('#fTitle').value = L.title; $('#fLead').value = L.lead; $('#rte').innerHTML = L.html;
  $('#fTitle').placeholder = lang === 'en' ? 'e.g. How to choose a study program in China' : 'Например: Как выбрать программу обучения в Китае';
  $('#fLead').placeholder = lang === 'en' ? '1–2 sentences: what the article is about' : '1–2 предложения: о чём статья и чем она поможет';
  $('#fFeatured').checked = !!cur.featured;
  const tgOk = ME && ME.telegram; $('#fTelegram').disabled = !tgOk; $('#tgRow').classList.toggle('off', !tgOk);
  $('#fTelegram').checked = false;
  $('#tgHint').textContent = !tgOk ? 'Не подключено: нужен бот и канал в настройках сервера' : (cur.telegram ? `Уже отправлено ${fmtDate(cur.telegram.sentAt)} — отметьте, чтобы отправить ещё раз` : 'Отправить пост со ссылкой в канал при публикации');
  setCover(cur.cover);
  const pub = cur.status === 'published';
  $('#edTitle').textContent = cur.id ? (cur.ru.title || 'Без заголовка') : 'Новая статья';
  $('#crumbCur').textContent = cur.id ? 'Редактирование' : 'Новая статья';
  $('#edStatus').textContent = pub ? 'Опубликована' : 'Черновик'; $('#edStatus').className = 'chip ' + (pub ? 'st-pub' : 'st-draft');
  $('#statusLine').innerHTML = pub ? `<b>Опубликована</b> ${fmtDate(cur.date)} — видна всем на сайте` : '<b>Черновик</b> — видите только вы';
  $('#btnDraft').hidden = pub; $('#btnUnpub').hidden = !pub; $('#btnDelete').hidden = !cur.id;
  $('#btnPublish').lastChild.textContent = pub ? 'Сохранить изменения' : 'Опубликовать';
  document.title = (cur.id ? cur.ru.title || 'Статья' : 'Новая статья') + ' — админ-панель';
  leadCount(); words(); renderCard();
}
function collect() {
  const L = cur[lang];
  L.title = $('#fTitle').value.trim(); L.lead = $('#fLead').value.trim(); L.html = cleanHtml($('#rte').innerHTML);
  cur.featured = $('#fFeatured').checked;
}
function dirty() { editorDirty = true; markSaved('Есть несохранённые изменения', true); }
function markSaved(t, isDirty) { const s = $('#edSaved'); s.textContent = t; s.classList.toggle('dirty', !!isDirty); }
function leadCount() { $('#leadCount').textContent = $('#fLead').value.length + '/200'; }
function words() { const n = ($('#rte').innerText || '').trim().split(/\s+/).filter(Boolean).length; $('#words').textContent = n ? `${n} слов · ~${Math.max(2, Math.round(n / 160))} мин чтения` : ''; }
function renderCard() {
  const L = cur[lang].title || cur[lang].lead ? cur[lang] : cur.ru;
  const title = $('#fTitle').value.trim() || L.title, lead = $('#fLead').value.trim() || L.lead;
  const [bg, fg] = CAT_COLORS[cur.cat];
  const cover = cur.cover ? `<div class="pc-cover img"><img src="${escH(cur.cover)}" alt=""></div>` : `<div class="pc-cover cv-${cur.cat}">${escH(title) || '<span class="ph">Заголовок статьи</span>'}</div>`;
  $('#pcard').innerHTML = `${cover}<span class="pc-cat" style="background:${bg};color:${fg}">${(lang === 'en' ? CATS_EN : CATS)[cur.cat]}</span>
    <h4>${escH(title) || '<span class="ph">Заголовок статьи</span>'}</h4><p>${escH(lead) || '<span class="ph">Короткое описание появится здесь</span>'}</p>
    <span class="pc-more">${lang === 'en' ? 'Read article' : 'Читать статью'}</span>`;
}
$('#langTabs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b || b.dataset.l === lang) return; collect(); lang = b.dataset.l; fillEditor(); });
$('#cats').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; cur.cat = b.dataset.c; $$('#cats button').forEach(x => x.classList.toggle('on', x === b)); renderCard(); dirty(); });
$('#fTitle').addEventListener('input', () => { renderCard(); dirty(); });
$('#fLead').addEventListener('input', () => { leadCount(); renderCard(); dirty(); });
$('#fFeatured').addEventListener('change', dirty);
$('#rte').addEventListener('input', () => { words(); dirty(); });

// обложка
function setCover(url) {
  cur.cover = url || ''; $('#coverImg').hidden = !url; $('#coverEmpty').hidden = !!url; $('#coverDel').hidden = !url;
  if (url) $('#coverImg').src = url; renderCard();
}
$('#coverFile').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  $('#coverBox').classList.add('busy');
  try { setCover(await uploadImage(await readFile(f), 1600)); dirty(); toast('Обложка загружена', 'ok'); } catch (er) { toast(er.message, 'err'); }
  $('#coverBox').classList.remove('busy');
});
$('#coverDel').onclick = () => { setCover(''); dirty(); };
$('#coverAi').onclick = async () => {
  if (!ME.aiImage) return toast('Генерация обложек не подключена: нужен ключ OpenAI в настройках сервера', 'err');
  const topic = await ask('Обложка с помощью ИИ', 'Опишите, что должно быть на картинке. Текст на обложке ИИ не пишет.', $('#fTitle').value || cur.ru.title, 'Например: студенты в кампусе китайского университета');
  if (!topic) return;
  const btn = $('#coverAi'); busy(btn, true); $('#coverBox').classList.add('busy');
  try { const j = await api('POST', '/api/ai/image', { prompt: topic }); setCover(await uploadImage(j.image, 1600)); dirty(); toast('Обложка готова', 'ok'); }
  catch (er) { toast(er.message, 'err'); }
  busy(btn, false); $('#coverBox').classList.remove('busy');
};

// текстовый редактор
const rte = $('#rte');
document.execCommand('defaultParagraphSeparator', false, 'p');
$('#rteBar').addEventListener('mousedown', e => { if (e.target.closest('button')) e.preventDefault(); });
$('#rteBar').addEventListener('click', async e => {
  const b = e.target.closest('button[data-cmd]'); if (!b) return;
  rte.focus();
  const cmd = b.dataset.cmd;
  if (cmd === 'quote') document.execCommand('formatBlock', false, 'blockquote');
  else if (cmd === 'link') {
    const sel = getSelection(); const range = sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
    const url = await ask('Ссылка', 'Выделите текст в статье и вставьте адрес ссылки.', 'https://', 'https://…');
    if (!url) return; rte.focus(); if (range) { sel.removeAllRanges(); sel.addRange(range); }
    if (range && range.collapsed) document.execCommand('insertHTML', false, `<a href="${escH(url)}">${escH(url)}</a>`);
    else document.execCommand('createLink', false, url);
  } else if (cmd === 'removeFormat') { document.execCommand('removeFormat'); document.execCommand('formatBlock', false, 'p'); }
  else document.execCommand(cmd);
  words(); dirty(); syncBlock();
});
$('#rteBlock').addEventListener('change', e => { rte.focus(); document.execCommand('formatBlock', false, e.target.value); dirty(); });
function syncBlock() {
  const sel = getSelection(); if (!sel.rangeCount) return;
  let n = sel.anchorNode; while (n && n !== rte) { if (n.nodeType === 1 && /^(H2|H3|P)$/.test(n.tagName)) { $('#rteBlock').value = n.tagName.toLowerCase(); return; } n = n.parentNode; }
  $('#rteBlock').value = 'p';
}
document.addEventListener('selectionchange', () => { if (document.activeElement === rte) syncBlock(); });
rte.addEventListener('paste', e => {
  e.preventDefault();
  const html = e.clipboardData.getData('text/html'), text = e.clipboardData.getData('text/plain');
  const clean = html ? cleanHtml(html) : text.split(/\n{2,}|\r\n\r\n/).map(s => s.trim()).filter(Boolean).map(s => '<p>' + escH(s).replace(/\n/g, '<br>') + '</p>').join('');
  document.execCommand('insertHTML', false, clean); words(); dirty();
});
$('#rteImg').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  try { const url = await uploadImage(await readFile(f), 1400); rte.focus(); document.execCommand('insertHTML', false, `<p><img src="${url}" alt=""></p>`); dirty(); }
  catch (er) { toast(er.message, 'err'); }
});

// сохранение и публикация
async function save(quiet) {
  collect();
  const body = { cat: cur.cat, featured: cur.featured, cover: cur.cover, ru: cur.ru, en: cur.en };
  if (!cur.ru.title && !cur.en.title) throw new Error('Добавьте заголовок (на русском)');
  const j = cur.id ? await api('PUT', '/api/articles/' + cur.id, body) : await api('POST', '/api/articles', body);
  const wasNew = !cur.id; cur = j.article; cur.en = cur.en || { title: '', lead: '', html: '' };
  editorDirty = false;
  if (wasNew) { lastHash = '#/edit/' + cur.id; history.replaceState(null, '', lastHash); }
  markSaved('Сохранено в ' + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
  if (!quiet) toast('Черновик сохранён', 'ok');
  return cur;
}
$('#btnDraft').onclick = async () => { const b = $('#btnDraft'); busy(b, true); try { await save(); fillEditor(); } catch (e) { toast(e.message, 'err'); } busy(b, false); };
$('#btnPublish').onclick = async () => {
  const b = $('#btnPublish'); busy(b, true);
  try {
    const wasPub = cur.status === 'published';
    await save(true);
    if (!wasPub) cur = (await api('POST', `/api/articles/${cur.id}/publish`)).article;
    toast(wasPub ? 'Изменения опубликованы' : 'Статья опубликована на сайте', 'ok');
    if ($('#fTelegram').checked) {
      try { await api('POST', `/api/articles/${cur.id}/telegram`); toast('Пост отправлен в Telegram', 'ok'); cur = (await api('GET', '/api/articles/' + cur.id)).article; }
      catch (e) { toast(e.message, 'err'); }
    }
    cur.en = cur.en || { title: '', lead: '', html: '' }; fillEditor(); markSaved('Опубликовано');
  } catch (e) { toast(e.message, 'err'); }
  busy(b, false);
};
$('#btnUnpub').onclick = async () => {
  if (!(await ask('Снять с публикации?', 'Статья исчезнет с сайта и станет черновиком. Её можно будет опубликовать снова.', null))) return;
  try { await save(true); cur = (await api('POST', `/api/articles/${cur.id}/unpublish`)).article; cur.en = cur.en || { title: '', lead: '', html: '' }; fillEditor(); toast('Статья снята с публикации', 'ok'); }
  catch (e) { toast(e.message, 'err'); }
};
$('#btnDelete').onclick = () => deleteArticle(cur.id);
$('#btnPreview').onclick = () => {
  collect();
  const L = lang;
  try { localStorage.setItem('beengo-preview', JSON.stringify({ id: cur.id || 'preview', cat: cur.cat, cover: cur.cover, ru: cur.ru, en: cur.en, t: Date.now() })); }
  catch { return toast('Браузер не дал сохранить предпросмотр', 'err'); }
  window.open(`/article.html?preview=1&lang=${L}`, '_blank');
};
addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && !$('#viewEdit').hidden) { e.preventDefault(); (cur.status === 'published' ? $('#btnPublish') : $('#btnDraft')).click(); }
});

// ---------- помощник ChatGPT
let chat = [];
function aiInit() {
  $('#ai').classList.toggle('off', !ME.ai);
  chat = []; $('#aiMsgs').innerHTML = '';
  if (!ME.ai) addMsg('sys', 'Помощник не подключён. Чтобы он заработал, добавьте ключ OpenAI в файл настроек на сервере (OPENAI_API_KEY) и перезапустите админку.');
  else addMsg('bot', 'Привет! Я помогу подготовить статью: напишу черновик по теме, улучшу текст, придумаю заголовок или переведу на английский. Выберите действие ниже или напишите свою просьбу.');
}
function addMsg(kind, text, opts = {}) {
  const d = document.createElement('div'); d.className = 'msg ' + kind;
  if (opts.html) { d.innerHTML = `<div class="msg-html">${opts.html}</div>`; } else d.textContent = text;
  if (opts.actions) {
    const a = document.createElement('div'); a.className = 'acts';
    opts.actions.forEach(([label, fn]) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.onclick = fn; a.appendChild(b); });
    d.appendChild(a);
  }
  $('#aiMsgs').appendChild(d); $('#aiMsgs').scrollTop = 1e9; return d;
}
function articleCtx() { if ($('#viewEdit').hidden || !cur) return null; collect(); return { title: cur[lang].title, lead: cur[lang].lead, html: cur[lang].html }; }
function parseJson(t) { const m = t.match(/\{[\s\S]*\}/); if (!m) return null; try { return JSON.parse(m[0]); } catch { return null; } }
async function aiSend(prompt, kind, shown) {
  if (!ME.ai) return;
  if (!cur && kind !== 'chat') { toast('Откройте статью в редакторе', 'err'); return; }
  addMsg('user', shown || prompt);
  chat.push({ role: 'user', content: prompt });
  const wait = addMsg('bot typing', 'Печатает…');
  try {
    const j = await api('POST', '/api/ai/chat', { messages: chat, article: articleCtx(), lang });
    wait.remove(); const reply = j.reply || ''; chat.push({ role: 'assistant', content: reply });
    showReply(reply, kind);
  } catch (e) { wait.remove(); addMsg('err', e.message); chat.pop(); }
}
function showReply(reply, kind) {
  if (kind === 'meta') {
    const o = parseJson(reply);
    if (o && (o.title || o.lead)) return addMsg('bot', '', { html: `<p><b>${escH(o.title || '')}</b></p><p>${escH(o.lead || '')}</p>`, actions: [['Применить', () => { if (o.title) $('#fTitle').value = o.title; if (o.lead) $('#fLead').value = o.lead.slice(0, 400); leadCount(); renderCard(); dirty(); toast('Заголовок и описание обновлены', 'ok'); }]] });
  }
  if (kind === 'translate') {
    const o = parseJson(reply);
    if (o && (o.title || o.html)) return addMsg('bot', '', {
      html: `<p><b>${escH(o.title || '')}</b></p><p>${escH(o.lead || '')}</p>${cleanHtml(o.html || '')}`,
      actions: [['Заполнить английскую версию', () => { collect(); cur.en = { title: o.title || '', lead: (o.lead || '').slice(0, 400), html: cleanHtml(o.html || '') }; lang = 'en'; fillEditor(); dirty(); toast('Английская версия заполнена — проверьте и сохраните', 'ok'); }]],
    });
  }
  const isHtml = /<(p|h2|h3|ul|ol)\b/i.test(reply);
  const html = isHtml ? cleanHtml(reply.replace(/^```(html)?|```$/gim, '')) : textFromMarkdownish(reply);
  const long = /<(h2|p)\b/i.test(html) && reply.length > 160;
  addMsg('bot', '', {
    html, actions: long ? [
      ['Вставить в редактор', () => { $('#rte').focus(); document.execCommand('insertHTML', false, html); words(); dirty(); toast('Текст добавлен', 'ok'); }],
      ['Заменить весь текст', async () => { if ($('#rte').innerText.trim() && !(await ask('Заменить текст статьи?', 'Текущий текст будет заменён ответом помощника. Отменить можно кнопкой «Отменить» в редакторе.', null))) return; $('#rte').innerHTML = html; words(); dirty(); toast('Текст заменён', 'ok'); }],
    ] : null,
  });
}
const L_NAME = () => lang === 'en' ? 'на английском' : 'на русском';
$('#aiQuick').addEventListener('click', async e => {
  const b = e.target.closest('button'); if (!b) return;
  if ($('#viewEdit').hidden) return toast('Сначала откройте или создайте статью', 'err');
  const q = b.dataset.q;
  if (q === 'draft') {
    const topic = await ask('Статья по теме', 'О чём написать? Помощник подготовит черновик с разделами — его можно будет поправить.', $('#fTitle').value, 'Например: как получить грант CSC');
    if (!topic) return;
    return aiSend(`Напиши статью ${L_NAME()} для блога на тему: «${topic}». 4–6 разделов с заголовками <h2>, короткие абзацы, где уместно — списки. Объём 500–800 слов. Ответ — только HTML.`, 'html', 'Написать статью: ' + topic);
  }
  if (q === 'improve') return aiSend(`Улучши текст статьи ${L_NAME()}: исправь ошибки, сделай понятнее и живее, сохрани структуру и факты. Ответ — только HTML всей статьи.`, 'html', 'Улучшить текст статьи');
  if (q === 'short') return aiSend(`Сократи текст статьи ${L_NAME()} примерно на треть без потери смысла, сохрани разделы. Ответ — только HTML всей статьи.`, 'html', 'Сделать текст короче');
  if (q === 'meta') return aiSend(`Предложи для этой статьи ${L_NAME()} цепкий заголовок (до 70 символов) и короткое описание для карточки (до 160 символов). Ответь только JSON: {"title":"…","lead":"…"}`, 'meta', 'Придумать заголовок и описание');
  if (q === 'translate') {
    collect(); const R = cur.ru;
    if (!R.title && !R.html) return toast('Сначала заполните русскую версию', 'err');
    return aiSend(`Переведи статью на английский язык естественно, как для англоязычного читателя. Сохрани HTML-разметку текста.
Заголовок: ${R.title}
Описание: ${R.lead}
Текст (HTML): ${R.html}
Ответь только JSON: {"title":"…","lead":"…","html":"…"}`, 'translate', 'Перевести статью на английский');
  }
});
$('#aiForm').addEventListener('submit', e => { e.preventDefault(); const t = $('#aiInput').value.trim(); if (!t) return; $('#aiInput').value = ''; aiSend(t, 'chat'); });
$('#aiInput').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('#aiForm').requestSubmit(); } });
$('#aiClear').onclick = () => aiInit();

boot();
