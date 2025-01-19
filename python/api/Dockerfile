FROM python:3.8.6-slim

RUN mkdir /app

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY recommendation_dataset/ recommendation_dataset/

COPY agents/ agents/

COPY agent_controller.py agent_controller.py

COPY main.py main.py

ENTRYPOINT [ "python", "main.py" ]

## docker build --platform linux/amd64 -t coffee-bot:latest /Users/abdalla/Projects/tutorials/coffee-bot/python/api