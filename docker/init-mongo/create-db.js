db.createUser({
  user: "user_fluorometro",
  pwd: "pass_fluorometro",
  roles: [
    {
      role: "readWrite",
      db: "fluorometro"
    }
  ]
})
