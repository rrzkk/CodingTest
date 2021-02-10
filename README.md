# CodingTest
This is a smal project developed by Zhekun(Vincent) Ren used for display and filter data from database, using ReactJS, NodeJS, TypeScript, Postgres, Webpack and MaterialUI
This project is tested by Jest and Postman, deployed using Docker, shell and AWS(ECS Fargate)
Whole service is deployed on AWS(database, backend and frontend)

## Project Demo
http://52.65.96.188/
Noticed: clicked on the column name would sort the table by that column

## Installation

```bash
cd server
npm install
cd ..
cd reactui
npm install
```

## Production mode running

1. directly running /server/builddocker.sh would generate the docker image and running it on port 8080
2. running /reactui/builddocker to generate the docker image and running it

OR

```bash
cd server
npm run start
cd ..
cd reactui
npm run start
```

## Dev mode running

```bash
cd server
npm run devstart
cd ..
cd reactui
npm run devstart
```
