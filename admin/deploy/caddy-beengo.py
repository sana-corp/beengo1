# Заменяет блок beengoclient.com в /etc/caddy/Caddyfile: сайт + админка.
# Остальные сайты в файле не трогает. Перед изменением делает копию Caddyfile.bak
import shutil,re
p='/etc/caddy/Caddyfile'; shutil.copy(p,p+'.bak')
out=[];blk=[];d=0
for line in open(p).read().splitlines(keepends=True):
    if d==0 and not blk and '{' not in line:
        if 'Beengo' not in line: out.append(line)
        continue
    blk.append(line); d+=line.count('{')-line.count('}')
    if d==0:
        head=blk[0].split('{')[0]
        if not (re.search(r'(^|[\s,])(www\.)?beengoclient\.com',head) or ':8088' in head): out+=blk
        blk=[]
s=''.join(out).rstrip()+'''

# ---- Beengo Study ----
beengoclient.com {
    encode zstd gzip
    @admin path /admin /admin/* /api/* /data/* /uploads/*
    handle @admin {
        reverse_proxy 127.0.0.1:3100
    }
    handle {
        root * /var/www/beengo
        @hidden path /.git* /preview* /admin*
        respond @hidden 404
        @static path *.webp *.png *.jpg *.svg *.mp4 *.css *.js *.woff2
        header @static Cache-Control "public, max-age=86400"
        file_server
    }
}
www.beengoclient.com {
    redir https://beengoclient.com{uri} permanent
}
'''
open(p,'w').write(s); print(s)
