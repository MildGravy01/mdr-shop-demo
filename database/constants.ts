import 'dotenv/config';
const databaseSettings = {
  connectionLimit: 10,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const QIWI_CONF = {
  SECRET_KEY: process.env.QIWI_SECRET_KEY,
  PUBLIC_KEY: process.env.QIWI_PUBLIC_KEY,
  THEME_CODE: process.env.QIWI_THEME_TOKEN,
};
const ANYPAY_CONF = {
  SECRET_KEY: process.env.ANYPAY_SECRET_KEY,
  PROJECT_ID: process.env.ANYPAY_PROJECT_ID,
  API_KEY: process.env.ANYPAY_API_KEY,
};

const PAYOK_CONF = {
  SECRET_KEY: process.env.PAYOK_SECRET_KEY,
  PROJECT_ID: process.env.PAYOK_PROJECT_ID,
};

const LAVA_CONF = {
  SECRET_KEY: process.env.LAVA_SECRET_KEY,
  PROJECT_ID: process.env.LAVA_PROJECT_ID,
  ADD_KEY: process.env.LAVA_ADD_KEY,
};

const NALOG_CONF = {
  login: process.env.NALOG_LOGIN,
  password: process.env.NALOG_PASS,
};

const devMode = process.env.NODE_ENV === 'dev';

export {QIWI_CONF, ANYPAY_CONF, PAYOK_CONF, LAVA_CONF, NALOG_CONF, databaseSettings, devMode};
