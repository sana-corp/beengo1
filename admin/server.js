#!/usr/bin/env node
/*
  Beengo Study — админка статей.
  Один файл, без сторонних библиотек (нужен только Node.js 18+).

  Что делает:
   • /admin/            — панель (логин, список статей, редактор, помощник ChatGPT)
   • /api/...           — сохранение статей, загрузка картинок, ИИ, Telegram (только после входа)
   • /data/articles.json — опубликованные статьи для сайта (публично)
   • /uploads/...       — обложки и картинки статей (публично)

  Настройки — переменные окружения (см. admin/.env.example).
*/
'use strict';
const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

// ---------- настройки
const env = process.env;
const PORT = +env.PORT || 3100;
const HOST = env.HOST || '127.0.0.1';
const SITE_DIR = path.resolve(env.SITE_DIR || path.join(__dirname, '..'));
const DATA_DIR = path.resolve(env.DATA_DIR || path.join(__dirname, 'data'));
const PUBLIC_DIR = path.join(DATA_DIR, 'public');
const UPLOAD_DIR = path.join(PUBLIC_DIR, 'uploads');
const STORE = path.join(DATA_DIR, 'store.json');
const SITE_URL = (env.SITE_URL || 'https://beengoclient.com').replace(/\/+$/, '');
const ADMIN_USER = env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = env.ADMIN_PASSWORD || '';
const OPENAI_KEY = env.OPENAI_API_KEY || '';
const OPENAI_BASE = (env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
const TG_BASE = (env.TELEGRAM_API_BASE || 'https://api.telegram.org').replace(/\/+$/, '');
const OPENAI_MODEL = env.OPENAI_MODEL || 'gpt-4o-mini';
const OPENAI_IMAGE_MODEL = env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const TG_TOKEN = env.TELEGRAM_BOT_TOKEN || '';
const TG_CHAT = env.TELEGRAM_CHAT_ID || '';
const COOKIE_SECURE = env.COOKIE_SECURE !== '0';
const CATS = ['admission', 'programs', 'docs', 'life', 'grants'];

if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) {
  console.error('Укажите ADMIN_PASSWORD (не короче 8 символов) в файле настроек.');
  process.exit(1);
}

// ---------- пароль и сессии
const SALT = crypto.randomBytes(16);
const PASS_HASH = crypto.scryptSync(ADMIN_PASSWORD, SALT, 32);
const sessions = new Map();               // токен -> срок действия
const SESSION_MS = 12 * 3600 * 1000;
const attempts = new Map();               // ip -> {n, t}

function checkPassword(user, pass) {
  const u = Buffer.from(String(user || '')), eu = Buffer.from(ADMIN_USER);
  const uok = u.length === eu.length && crypto.timingSafeEqual(u, eu);
  const h = crypto.scryptSync(String(pass || ''), SALT, 32);
  return crypto.timingSafeEqual(h, PASS_HASH) && uok;
}
function newSession() {
  const t = crypto.randomBytes(32).toString('hex');
  sessions.set(t, Date.now() + SESSION_MS);
  return t;
}
function cookieOf(req, name) {
  const m = (req.headers.cookie || '').match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? m[1] : null;
}
function authed(req) {
  const t = cookieOf(req, 'bsid');
  if (!t || !sessions.has(t)) return false;
  if (sessions.get(t) < Date.now()) { sessions.delete(t); return false; }
  return true;
}
function ipOf(req) { return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || ''; }
function tooMany(ip) {
  const a = attempts.get(ip), now = Date.now();
  if (!a || now - a.t > 10 * 60 * 1000) { attempts.set(ip, { n: 0, t: now }); return false; }
  return a.n >= 8;
}

// ---------- безопасный HTML для текста статьи
const ALLOWED = {
  p: [], h2: [], h3: [], ul: [], ol: [], li: [], strong: [], b: [], em: [], i: [], u: [], s: [],
  blockquote: [], br: [], a: ['href'], img: ['src', 'alt'], figure: [], figcaption: [],
};
const VOID = new Set(['br', 'img']);
function safeUrl(u, forImg) {
  u = String(u || '').trim();
  if (/^(https?:)?\/\//i.test(u) || /^\/[^/]/.test(u) || /^#/.test(u)) return u;
  if (!forImg && /^(mailto:|tel:)/i.test(u)) return u;
  if (/^[a-z0-9._-]+\.html(\?[^\s"<>]*)?(#[^\s"<>]*)?$/i.test(u)) return u;
  return '';
}
function esc(s) { return String(s).replace(/&(?!(?:[a-z]+|#\d+|#x[0-9a-f]+);)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function sanitize(html) {
  html = String(html || '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|iframe|object|embed|template|noscript|svg|math)[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<(script|style|iframe|object|embed|template|noscript|svg|math)\b[^>]*>/gi, '');
  const out = [];
  const stack = [];
  for (const part of html.split(/(<[^>]*>)/)) {
    if (!part) continue;
    if (part[0] !== '<') { out.push(esc(part)); continue; }
    const m = part.match(/^<\s*(\/?)\s*([a-zA-Z0-9]+)([^>]*)>$/);
    if (!m) continue;
    let [, close, tag, rest] = m; tag = tag.toLowerCase();
    if (tag === 'h1') tag = 'h2';
    if (tag === 'h4' || tag === 'h5' || tag === 'h6') tag = 'h3';
    if (tag === 'div') tag = 'p';
    if (!(tag in ALLOWED)) continue;
    if (close) {
      const i = stack.lastIndexOf(tag);
      if (i === -1) continue;
      while (stack.length > i) out.push('</' + stack.pop() + '>');
      continue;
    }
    let attrs = '';
    const re = /([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g; let a;
    while ((a = re.exec(rest))) {
      const name = a[1].toLowerCase(), val = a[3] ?? a[4] ?? a[5] ?? '';
      if (!ALLOWED[tag].includes(name)) continue;
      if (name === 'href' || name === 'src') {
        const u = safeUrl(val.replace(/&amp;/g, '&'), name === 'src');
        if (!u) continue;
        attrs += ` ${name}="${esc(u)}"`;
      } else attrs += ` ${name}="${esc(val.replace(/&amp;/g, '&'))}"`;
    }
    if (tag === 'a') attrs += ' target="_blank" rel="noopener"';
    if (tag === 'img') attrs += ' loading="lazy"';
    out.push('<' + tag + attrs + '>');
    if (!VOID.has(tag) && !/\/\s*$/.test(rest)) stack.push(tag);
  }
  while (stack.length) out.push('</' + stack.pop() + '>');
  return out.join('').replace(/<p>(\s|&nbsp;|<br>)*<\/p>/g, '').trim();
}
function plain(s, n) { s = String(s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); return n ? s.slice(0, n) : s; }

// ---------- адрес статьи из заголовка
const TR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
function slugify(t) {
  return String(t || '').toLowerCase().split('').map(c => TR[c] ?? c).join('')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').split('-').slice(0, 6).join('-') || 'statya';
}
function readMinutes(art) {
  const words = plain(art.ru.html).split(' ').filter(Boolean).length;
  return Math.max(2, Math.round(words / 160) || 2);
}

// ---------- хранилище
let store = { articles: [] };
async function saveStore() {
  const tmp = STORE + '.tmp';
  await fsp.writeFile(tmp, JSON.stringify(store, null, 1));
  await fsp.rename(tmp, STORE);
  await writePublic();
}
function publicView(a) {
  const t = x => String(x || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const pick = l => ({ title: t(l.title), lead: t(l.lead), html: l.html || '' });
  const o = { id: a.id, cat: a.cat, read: a.read, date: a.date, featured: !!a.featured, cover: a.cover || '', ru: pick(a.ru) };
  if (a.en && (a.en.title || a.en.html)) o.en = pick(a.en);
  return o;
}
function sortedPublished() {
  return store.articles.filter(a => a.status === 'published')
    .sort((x, y) => (y.date || '').localeCompare(x.date || ''));
}
async function writePublic() {
  const body = JSON.stringify({ updated: new Date().toISOString(), articles: sortedPublished().map(publicView) });
  const f = path.join(PUBLIC_DIR, 'articles.json');
  await fsp.writeFile(f + '.tmp', body); await fsp.rename(f + '.tmp', f);
}
// первый запуск: переносим статьи, которые уже есть на сайте (articles-data.js)
function seedFromSite() {
  const file = path.join(SITE_DIR, 'articles-data.js');
  if (!fs.existsSync(file)) return [];
  const ctx = { window: {}, location: { search: '', href: 'https://x/' }, localStorage: { getItem() { return null; }, setItem() {} }, URLSearchParams, URL };
  vm.createContext(ctx); vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { timeout: 2000 });
  const RU = ctx.window.BEENGO_ARTICLES || [], ENM = ctx.window.BEENGO_ARTICLES_EN || {};
  const toHtml = secs => (secs || []).map(s => `<h2>${esc(s.q)}</h2>` + (s.p || []).map(t => `<p>${esc(t)}</p>`).join('')).join('');
  const now = Date.now();
  return RU.map((a, i) => {
    const en = ENM[a.id];
    const date = new Date(now - (i + 1) * 3600 * 1000).toISOString();
    return {
      id: a.id, cat: a.cat, status: 'published', featured: i < 3, cover: '', date, created: date, updated: date, read: a.read || 4,
      ru: { title: a.title, lead: a.lead, html: toHtml(a.sections) },
      en: en ? { title: en.title, lead: en.lead, html: toHtml(en.sections) } : { title: '', lead: '', html: '' },
    };
  });
}
async function initStore() {
  await fsp.mkdir(UPLOAD_DIR, { recursive: true });
  if (fs.existsSync(STORE)) store = JSON.parse(await fsp.readFile(STORE, 'utf8'));
  else { store = { articles: seedFromSite() }; await saveStore(); console.log(`Перенесено статей с сайта: ${store.articles.length}`); }
  await writePublic();
}

// ---------- HTTP-помощники
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
function send(res, code, body, headers = {}) {
  const isObj = typeof body === 'object' && !Buffer.isBuffer(body);
  res.writeHead(code, { 'Content-Type': isObj ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store', ...headers });
  res.end(isObj ? JSON.stringify(body) : body);
}
async function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > limit) { reject(Object.assign(new Error('Слишком большой запрос'), { code: 413 })); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); } catch { reject(Object.assign(new Error('Неверный формат'), { code: 400 })); } });
    req.on('error', reject);
  });
}
async function serveFile(res, root, rel, cache) {
  const file = path.normalize(path.join(root, rel));
  if (!file.startsWith(root + path.sep) && file !== root) return send(res, 404, 'Not found');
  try {
    const st = await fsp.stat(file); if (!st.isFile()) throw 0;
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': cache || 'no-cache', 'Content-Length': st.size });
    fs.createReadStream(file).pipe(res);
  } catch { send(res, 404, 'Not found'); }
}

// ---------- статьи: проверка и сохранение
function cleanLang(l) {
  l = l || {};
  return { title: plain(l.title, 160), lead: plain(l.lead, 400), html: sanitize(l.html).slice(0, 200000) };
}
function applyInput(art, inp) {
  if (inp.cat && CATS.includes(inp.cat)) art.cat = inp.cat;
  art.ru = cleanLang(inp.ru); art.en = cleanLang(inp.en);
  art.featured = !!inp.featured;
  if (typeof inp.cover === 'string') art.cover = /^\/uploads\/[a-z0-9._-]+$/i.test(inp.cover) ? inp.cover : '';
  art.read = readMinutes(art);
  art.updated = new Date().toISOString();
}
function uniqueId(base) {
  let id = base, k = 2;
  while (store.articles.some(a => a.id === id)) id = base + '-' + k++;
  return id;
}

// ---------- ChatGPT
async function openai(pathname, body) {
  const r = await fetch(OPENAI_BASE + '/' + pathname, {
    method: 'POST', headers: { Authorization: 'Bearer ' + OPENAI_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error((j.error && j.error.message) || ('OpenAI: ошибка ' + r.status)), { code: 502 });
  return j;
}
const SYSTEM = `Ты — редактор блога Beengo Study, компании, которая помогает абитуриентам из СНГ поступить в университеты Китая.
Пиши понятно, дружелюбно и по делу, без воды и без выдуманных фактов: если точные цифры или правила зависят от вуза или года, так и скажи.
Когда просят текст статьи, отвечай готовым HTML только с тегами <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>, без <html>, <body>, без markdown и без пояснений до и после.`;

// ---------- Telegram
async function postTelegram(a) {
  const url = SITE_URL + '/article.html#' + a.id;
  const t = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const text = `<b>${t(a.ru.title)}</b>\n\n${t(a.ru.lead)}\n\n<a href="${t(url)}">Читать статью</a>`;
  const api = m => `${TG_BASE}/bot${TG_TOKEN}/${m}`;
  const body = a.cover ? { chat_id: TG_CHAT, photo: SITE_URL + a.cover, caption: text.slice(0, 1024), parse_mode: 'HTML' }
    : { chat_id: TG_CHAT, text, parse_mode: 'HTML' };
  const r = await fetch(api(a.cover ? 'sendPhoto' : 'sendMessage'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!j.ok) throw new Error('Telegram: ' + (j.description || r.status));
  return j.result && j.result.message_id;
}

// ---------- маршруты API
async function api(req, res, url) {
  const p = url.pathname, m = req.method;
  if (p === '/api/login' && m === 'POST') {
    const ip = ipOf(req);
    if (tooMany(ip)) return send(res, 429, { error: 'Слишком много попыток. Подождите 10 минут.' });
    const b = await readBody(req, 10000);
    if (!checkPassword(b.user, b.pass)) { attempts.get(ip).n++; return send(res, 401, { error: 'Неверный логин или пароль' }); }
    attempts.delete(ip);
    const t = newSession();
    return send(res, 200, { ok: true }, { 'Set-Cookie': `bsid=${t}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_MS / 1000}${COOKIE_SECURE ? '; Secure' : ''}` });
  }
  if (p === '/api/logout' && m === 'POST') {
    const t = cookieOf(req, 'bsid'); if (t) sessions.delete(t);
    return send(res, 200, { ok: true }, { 'Set-Cookie': `bsid=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${COOKIE_SECURE ? '; Secure' : ''}` });
  }
  if (!authed(req)) return send(res, 401, { error: 'Нужно войти' });
  // защита от подделки запросов с чужих сайтов
  if (m !== 'GET' && req.headers['x-beengo'] !== '1') return send(res, 403, { error: 'Запрос отклонён' });

  if (p === '/api/me') return send(res, 200, { user: ADMIN_USER, ai: !!OPENAI_KEY, aiImage: !!OPENAI_KEY, telegram: !!(TG_TOKEN && TG_CHAT), cats: CATS });
  if (p === '/api/articles' && m === 'GET') {
    return send(res, 200, { articles: store.articles.map(a => ({ id: a.id, cat: a.cat, status: a.status, featured: a.featured, date: a.date, updated: a.updated, cover: a.cover, title: a.ru.title, en: !!(a.en && a.en.title) })).sort((x, y) => (y.updated || '').localeCompare(x.updated || '')) });
  }
  const mm = p.match(/^\/api\/articles\/([a-z0-9-]+)(\/(publish|unpublish|telegram))?$/);
  if (p === '/api/articles' && m === 'POST') {
    const b = await readBody(req, 3e6);
    const art = { id: '', cat: CATS.includes(b.cat) ? b.cat : 'admission', status: 'draft', featured: false, cover: '', date: '', created: new Date().toISOString() };
    applyInput(art, b);
    art.id = uniqueId(slugify(art.ru.title || art.en.title));
    store.articles.push(art); await saveStore();
    return send(res, 200, { article: art });
  }
  if (mm) {
    const art = store.articles.find(a => a.id === mm[1]);
    if (!art) return send(res, 404, { error: 'Статья не найдена' });
    if (!mm[2] && m === 'GET') return send(res, 200, { article: art });
    if (!mm[2] && m === 'PUT') { applyInput(art, await readBody(req, 3e6)); await saveStore(); return send(res, 200, { article: art }); }
    if (!mm[2] && m === 'DELETE') { store.articles = store.articles.filter(a => a !== art); await saveStore(); return send(res, 200, { ok: true }); }
    if (mm[3] === 'publish' && m === 'POST') {
      if (!art.ru.title || !art.ru.lead || plain(art.ru.html).length < 40) return send(res, 400, { error: 'Для публикации нужны заголовок, описание и текст статьи (на русском).' });
      if (art.status !== 'published') { art.status = 'published'; art.date = new Date().toISOString(); }
      await saveStore(); return send(res, 200, { article: art });
    }
    if (mm[3] === 'unpublish' && m === 'POST') { art.status = 'draft'; await saveStore(); return send(res, 200, { article: art }); }
    if (mm[3] === 'telegram' && m === 'POST') {
      if (!TG_TOKEN || !TG_CHAT) return send(res, 400, { error: 'Telegram не подключён' });
      if (art.status !== 'published') return send(res, 400, { error: 'Сначала опубликуйте статью' });
      const id = await postTelegram(art);
      art.telegram = { sentAt: new Date().toISOString(), messageId: id }; await saveStore();
      return send(res, 200, { ok: true, telegram: art.telegram });
    }
  }
  if (p === '/api/upload' && m === 'POST') {
    const b = await readBody(req, 12e6);
    const mt = String(b.data || '').match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);
    if (!mt) return send(res, 400, { error: 'Нужна картинка PNG, JPG или WebP' });
    const buf = Buffer.from(mt[2], 'base64');
    if (buf.length > 8e6) return send(res, 413, { error: 'Картинка больше 8 МБ' });
    const ext = mt[1] === 'jpeg' ? 'jpg' : mt[1];
    const name = Date.now().toString(36) + '-' + crypto.randomBytes(5).toString('hex') + '.' + ext;
    await fsp.writeFile(path.join(UPLOAD_DIR, name), buf);
    return send(res, 200, { url: '/uploads/' + name });
  }
  if (p === '/api/ai/chat' && m === 'POST') {
    if (!OPENAI_KEY) return send(res, 400, { error: 'Помощник не подключён: добавьте ключ OpenAI в настройки сервера.' });
    const b = await readBody(req, 4e5);
    const ctx = b.article ? `Текущая статья (язык: ${b.lang === 'en' ? 'английский' : 'русский'}).\nЗаголовок: ${plain(b.article.title, 200)}\nОписание: ${plain(b.article.lead, 400)}\nТекст (HTML):\n${String(b.article.html || '').slice(0, 30000)}` : '';
    const msgs = [{ role: 'system', content: SYSTEM + (ctx ? '\n\n' + ctx : '') }]
      .concat((b.messages || []).slice(-12).map(x => ({ role: x.role === 'assistant' ? 'assistant' : 'user', content: String(x.content || '').slice(0, 20000) })));
    const j = await openai('chat/completions', { model: OPENAI_MODEL, messages: msgs });
    return send(res, 200, { reply: (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content || '').trim() });
  }
  if (p === '/api/ai/image' && m === 'POST') {
    if (!OPENAI_KEY) return send(res, 400, { error: 'Генерация обложек не подключена: добавьте ключ OpenAI.' });
    const b = await readBody(req, 2e4);
    const prompt = `Обложка для статьи в блоге о поступлении в университеты Китая. Тема: «${plain(b.prompt, 300)}». Светлая, современная иллюстрация в мягких тонах, без текста и букв на картинке, без логотипов.`;
    const body = { model: OPENAI_IMAGE_MODEL, prompt, n: 1, size: /dall-e-2/.test(OPENAI_IMAGE_MODEL) ? '1024x1024' : (/dall-e-3/.test(OPENAI_IMAGE_MODEL) ? '1792x1024' : '1536x1024') };
    if (/dall-e/.test(OPENAI_IMAGE_MODEL)) body.response_format = 'b64_json';
    const j = await openai('images/generations', body);
    const b64 = j.data && j.data[0] && j.data[0].b64_json;
    if (!b64) return send(res, 502, { error: 'ИИ не вернул картинку' });
    return send(res, 200, { image: 'data:image/png;base64,' + b64 });
  }
  return send(res, 404, { error: 'Не найдено' });
}

// ---------- сервер
const ADMIN_DIR = path.join(__dirname, 'public');
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  try {
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    if (url.pathname === '/data/articles.json') return serveFile(res, PUBLIC_DIR, 'articles.json', 'no-cache');
    if (url.pathname.startsWith('/uploads/')) return serveFile(res, UPLOAD_DIR, decodeURIComponent(url.pathname.slice(9)), 'public, max-age=31536000, immutable');
    if (url.pathname === '/admin') { res.writeHead(301, { Location: '/admin/' }); return res.end(); }
    if (url.pathname.startsWith('/admin/')) {
      const rel = decodeURIComponent(url.pathname.slice(7)) || 'index.html';
      return serveFile(res, ADMIN_DIR, rel, 'no-cache');
    }
    // для проверки на своём компьютере: отдаём и сам сайт (на сервере сайт отдаёт Caddy)
    if (env.SERVE_SITE === '1') {
      const rel = decodeURIComponent(url.pathname === '/' ? 'index.html' : url.pathname.slice(1));
      if (!/^(admin|\.git)/.test(rel)) return serveFile(res, SITE_DIR, rel, 'no-cache');
    }
    send(res, 404, 'Not found');
  } catch (e) {
    console.error(e);
    send(res, e.code >= 400 && e.code < 600 ? e.code : 500, { error: e.message || 'Ошибка сервера' });
  }
});
initStore().then(() => server.listen(PORT, HOST, () => console.log(`Админка Beengo: http://${HOST}:${PORT}/admin/  (данные: ${DATA_DIR})`)));
