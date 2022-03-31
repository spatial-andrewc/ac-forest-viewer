# pull official base image
FROM python:3.9.2-slim-buster

# set working directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH "${PYTHONPATH}:/app/"

# install system dependencies
RUN apt-get update \
  && apt-get -y install netcat gcc postgresql libpq-dev \
  && apt-get clean


RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt


# copy app over for deployment, locally it's mounted so can develop and run
COPY . .

COPY ./entrypoint.sh .
RUN chmod +x /usr/src/app/entrypoint.sh

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]