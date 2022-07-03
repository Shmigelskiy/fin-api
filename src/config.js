const config = {
  port: process.env.PORT || 3000,
  isDevelopment: process.env.NODE_ENV === "development",
  db: {
    mongoUri:
      "mongodb+srv://root:oCgyBGEhcfopLskw@bt-cluster.m6lnu.mongodb.net/fin-api?retryWrites=true&w=majority",
  },
};

export default config;
