import sequelize from '../config/database';
import Device from './Devices';

const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    plan_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      defaultValue: null,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    password_salt: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    is_active: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },

    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },

    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  { freezeTableName: true },
);

async function createModel() {
  try {
    // Plan.hasMany(User, { foreignKey: 'plan_id' });
    User.hasMany(Device, { foreignKey: 'user_id' });

    // await Plan.sync({ force: false, logging: false });
    await User.sync({ force: false, logging: false });
    await Device.sync({ force: false, logging: false });
  } catch (error) {
    console.log(error);
  }
}

createModel();

export default User;
