FROM nginx

COPY ./default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY /dist/my-blog-web /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
