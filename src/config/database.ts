import { Sequelize } from 'sequelize';

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
}: {
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
} = {
  DB_NAME: String(process.env.DB_NAME),
  DB_USERNAME: String(process.env.DB_USERNAME),
  DB_PASSWORD: String(process.env.DB_PASSWORD),
  DB_HOST: String(process.env.DB_HOST),
  DB_PORT: Number(process.env.DB_PORT),
};

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(`MySQL DB: ${DB_NAME} [PORT: ${process.env.PORT}]`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connectDB();

export default sequelize;
