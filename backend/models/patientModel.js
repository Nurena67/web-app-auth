import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js';

const Patient = sequelize.define(
  'Patient',
  {
    medicalRecordNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    complaint: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    medicalHistory: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    bloodGroup: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    familyName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      }
  },
    timestamps: true,
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
  }
);

User.hasMany(Patient, { foreignKey: 'userId' });
Patient.belongsTo(User, { foreignKey: 'userId' });

export default Patient;
