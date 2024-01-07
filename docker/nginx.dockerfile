FROM nginx:stable
ADD docker/conf/vhost.conf /etc/nginx/conf.d/
WORKDIR /var/www/html
