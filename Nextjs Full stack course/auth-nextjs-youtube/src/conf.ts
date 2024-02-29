const conf = {
  mongodburi: process.env.MONGO_URI,
  jwtsecretkey: process.env.JWT_SECRET_KEY,
  domain: process.env.DOMAIN,
  host: process.env.HOST,
  user: process.env.USER,
  pass: process.env.PASS,
  port: process.env.PORT || 2525,
};

export default conf;
