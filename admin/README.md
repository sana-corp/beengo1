# Админка статей Beengo Study

Панель, в которой можно самим писать, редактировать и публиковать статьи сайта.
Открывается по адресу **https://beengoclient.com/admin/**.

Что умеет:

- список всех статей: опубликованные и черновики, поиск по заголовку;
- редактор: категория, заголовок, короткое описание, обложка (загрузка или генерация ИИ),
  полный текст с заголовками разделов, списками, ссылками и картинками;
- живая карточка «как на сайте» рядом с формой;
- русская и английская версии статьи (английскую видят те, кто выбрал на сайте «eng»);
- черновик, предпросмотр на сайте, публикация, снятие с публикации, удаление;
- «На главной» — статья попадает в блок «Топ-3» на главной странице;
- помощник ChatGPT: написать статью по теме, улучшить или сократить текст,
  придумать заголовок и описание, перевести на английский;
- отправка поста со ссылкой в Telegram-канал при публикации.

Из разделов статьи (стиль «Заголовок раздела») автоматически собирается оглавление.
Время чтения считается само.

## Как это устроено

- `admin/server.js` — небольшая программа на Node.js (без сторонних библиотек).
  Хранит статьи в `/var/lib/beengo-admin`, отдаёт панель и API.
- Сайт берёт опубликованные статьи из `/data/articles.json`. Если админка не запущена,
  сайт показывает статьи из `articles-data.js` (как раньше), поэтому ничего не ломается.
- При первом запуске все статьи из `articles-data.js` переносятся в админку.

## Установка на сервер (один раз)

Все команды выполняются на сервере под root.

1. Забрать обновление сайта и проверить Node.js (нужна версия 18 или новее):

```bash
cd /var/www/beengo && git pull && node -v
```

Если `node -v` пишет «command not found» или версию ниже 18:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt install -y nodejs
```

2. Создать файл настроек и вписать пароль (и, при желании, ключ OpenAI и Telegram):

```bash
install -m 600 /var/www/beengo/admin/deploy/beengo-admin.env.example /etc/beengo-admin.env && nano /etc/beengo-admin.env
```

3. Запустить админку как службу (будет сама подниматься после перезагрузки сервера):

```bash
cp /var/www/beengo/admin/deploy/beengo-admin.service /etc/systemd/system/ && systemctl daemon-reload && systemctl enable --now beengo-admin && systemctl status beengo-admin --no-pager | head -5
```

4. Подключить админку к домену в Caddy (другие сайты в Caddyfile не меняются):

```bash
python3 /var/www/beengo/admin/deploy/caddy-beengo.py && caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile && systemctl reload caddy
```

5. Проверка — сайт, данные статей и админка должны ответить `200`:

```bash
for u in / /data/articles.json /admin/; do echo "$u $(curl -s -o /dev/null -w '%{http_code}' https://beengoclient.com$u)"; done
```

## Обновления

```bash
cd /var/www/beengo && git pull && systemctl restart beengo-admin
```

Статьи и картинки при этом не пропадают: они лежат в `/var/lib/beengo-admin`.

## Резервная копия статей

```bash
tar czf ~/beengo-articles-$(date +%F).tar.gz -C /var/lib/beengo-admin .
```

## Если что-то не работает

```bash
journalctl -u beengo-admin -n 50 --no-pager
```

- «Помощник не подключён» — не указан `OPENAI_API_KEY` в `/etc/beengo-admin.env`.
- Telegram неактивен — не указаны `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`;
  бот должен быть администратором канала.
- После правки `/etc/beengo-admin.env` нужен `systemctl restart beengo-admin`.

## Проверить на своём компьютере

```bash
ADMIN_PASSWORD=test-pass-123 COOKIE_SECURE=0 SERVE_SITE=1 node admin/server.js
```

Затем открыть http://127.0.0.1:3100/admin/ (логин `admin`).
