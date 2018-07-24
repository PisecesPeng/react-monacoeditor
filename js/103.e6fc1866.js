(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{"./node_modules/code-example/lib/nginx.js":function(n,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default='server {\n  listen 173.255.219.235:80;\n  server_name website.com.au;\n  rewrite / $scheme://www.$host$request_uri permanent; ## Forcibly prepend a www\n}\n\nserver {\n  listen 173.255.219.235:443;\n  server_name website.com.au;\n  rewrite / $scheme://www.$host$request_uri permanent; ## Forcibly prepend a www\n}\n\nserver {\n\n  listen      173.255.219.235:80;\n  server_name www.website.com.au;\n\n\n\n  root        /data/www;\n  index       index.html index.php;\n\n  location / {\n    index index.html index.php;     ## Allow a static html file to be shown first\n    try_files $uri $uri/ @handler;  ## If missing pass the URI to Magento\'s front handler\n    expires 30d;                    ## Assume all files are cachable\n  }\n\n  ## These locations would be hidden by .htaccess normally\n  location /app/                { deny all; }\n  location /includes/           { deny all; }\n  location /lib/                { deny all; }\n  location /media/downloadable/ { deny all; }\n  location /pkginfo/            { deny all; }\n  location /report/config.xml   { deny all; }\n  location /var/                { deny all; }\n\n  location /var/export/ { ## Allow admins only to view export folder\n    auth_basic           "Restricted"; ## Message shown in login window\n    auth_basic_user_file /rs/passwords/testfile; ## See /etc/nginx/htpassword\n    autoindex            on;\n  }\n\n  location  /. { ## Disable .htaccess and other hidden files\n    return 404;\n  }\n\n  location @handler { ## Magento uses a common front handler\n    rewrite / /index.php;\n  }\n\n  location ~ .php/ { ## Forward paths like /js/index.php/x.js to relevant handler\n    rewrite ^/(.*.php)/ /$1 last;\n  }\n\n  location ~ \\.php$ {\n    if (!-e $request_filename) { rewrite / /index.php last; } ## Catch 404s that try_files miss\n\n    fastcgi_pass   127.0.0.1:9000;\n    fastcgi_index  index.php;\n    fastcgi_param PATH_INFO $fastcgi_script_name;\n    fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;\n    include        /rs/confs/nginx/fastcgi_params;\n  }\n\n}\n\n\nserver {\n\n  listen              173.255.219.235:443;\n  server_name         website.com.au www.website.com.au;\n\n  root   /data/www;\n  index index.html index.php;\n\n  ssl                 on;\n  ssl_certificate     /rs/ssl/ssl.crt;\n  ssl_certificate_key /rs/ssl/ssl.key;\n\n  ssl_session_timeout  5m;\n\n  ssl_protocols  SSLv2 SSLv3 TLSv1;\n  ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;\n  ssl_prefer_server_ciphers   on;\n\n\n\n  location / {\n    index index.html index.php; ## Allow a static html file to be shown first\n    try_files $uri $uri/ @handler; ## If missing pass the URI to Magento\'s front handler\n    expires 30d; ## Assume all files are cachable\n  }\n\n  ## These locations would be hidden by .htaccess normally\n  location /app/                { deny all; }\n  location /includes/           { deny all; }\n  location /lib/                { deny all; }\n  location /media/downloadable/ { deny all; }\n  location /pkginfo/            { deny all; }\n  location /report/config.xml   { deny all; }\n  location /var/                { deny all; }\n\n  location /var/export/ { ## Allow admins only to view export folder\n    auth_basic           "Restricted"; ## Message shown in login window\n    auth_basic_user_file htpasswd; ## See /etc/nginx/htpassword\n    autoindex            on;\n  }\n\n  location  /. { ## Disable .htaccess and other hidden files\n    return 404;\n  }\n\n  location @handler { ## Magento uses a common front handler\n    rewrite / /index.php;\n  }\n\n  location ~ .php/ { ## Forward paths like /js/index.php/x.js to relevant handler\n    rewrite ^/(.*.php)/ /$1 last;\n  }\n\n  location ~ .php$ { ## Execute PHP scripts\n    if (!-e $request_filename) { rewrite  /index.php last; } ## Catch 404s that try_files miss\n\n    fastcgi_pass 127.0.0.1:9000;\n    fastcgi_index  index.php;\n    fastcgi_param PATH_INFO $fastcgi_script_name;\n    fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;\n    include        /rs/confs/nginx/fastcgi_params;\n\n    fastcgi_param HTTPS on;\n  }\n\n}\n\n'}}]);