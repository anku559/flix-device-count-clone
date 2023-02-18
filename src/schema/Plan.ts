import sequelize from '../config/database';

const { DataTypes } = require('sequelize');

const Plan = sequelize.define(
  'admin_plan',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    plan_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    plan_devices_count: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
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

export default Plan;
