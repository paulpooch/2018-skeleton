FROM postgres:10
RUN mkdir  -p /docker-entrypoint-initdb.d
COPY ./init-user-db.sh /docker-entrypoint-initdb.d/init-user-db.sh
