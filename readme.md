# Membuat Rest API NodeJs Express Sequelize dari Chat GTP

Langkah Setup:

mkdir rest-api

cd rest-api

npm init -y

npm install express sequelize sequelize-cli mysql2 winston

npx sequelize-cli init

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

npx sequelize-cli migration:generate --name create-users

npx sequelize-cli seed:generate --name demo-users

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all

node index.js