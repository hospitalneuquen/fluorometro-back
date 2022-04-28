export default () => ({
  sips: {
    host: process.env.MSSQL_HOST,
    database: process.env.MSSQL_DB,
    username: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
  },
});
