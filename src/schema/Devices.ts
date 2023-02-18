import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Device = sequelize.define(
  'user_devices',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    device_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    is_children: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
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

export default Device;
