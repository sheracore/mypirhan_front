FROM python:3.7-alpine
MAINTAINER sheracore App

# This is running python unbuffered mode
ENV PYTHONUNBUFFERED 1

copy ./requirements.txt /requirements.txt

# These installations is requiered for installing psycopg2
#RUN apk add --update py-pip
#RUN apk add --update --no-cache postgresql-client jpeg-dev
#RUN apk add --update --no-cache --virtual .tmp-build-deps postgresql-dev gcc libc-dev linux-headers musl-dev zlib zlib-dev
RUN pip install -r /requirements.txt
#RUN apk del .tmp.build-deps
RUN mkdir /app

WORKDIR /app
COPY ./app /app

# media is for all uploading by users like images and videos
#RUN mkdir -p /vol/web/media
# static dir is for static files like js codes reactjs codes and ...
#RUN mkdir -p /vol/web/static

# If you don't do this your application will be run by root user that is not secure
RUN adduser -D user
#RUN chown -R user:user /vol
#RUN chmod -R 755 /vol/web
USER user
