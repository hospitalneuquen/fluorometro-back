export default () => ({
  sips: {
    host: process.env.MSSQL_HOST,
    username: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
  },
});
