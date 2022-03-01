module.exports = {
    HOST: "ec2-3-227-195-74.compute-1.amazonaws.com",
    USER: "coerzjqhzledjw",
    PASSWORD: "dea70111485ec693b33659dd3947df3dd5bf27db77a86d3dee7534ab06c3dd37",
    DB: "df2vpnpnp6ni6f",
    dialect: "postgres",
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };