export default () => ({
  sips: {
    host: process.env.MSSQL_HOST,
    database: process.env.MSSQL_DB,
    username: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DB,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    authDB: process.env.MONGO_AUTH_DB,
  },
});
