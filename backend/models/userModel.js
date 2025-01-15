import {Sequelize} from 'sequelize';
import sequelize from '../config/database.js';
import Patient from './patientModel.js';

const {DataTypes} = Sequelize;
const User = sequelize.define(
    'User',
    {
        uuid:{
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
                len: [3, 100]
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notEmpty: true,
                isEmail: true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        role:{
            type: DataTypes.ENUM('admin', 'doctor', 'nurse'),
            allowNull: false,
            defaultValue: 'nurse',
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
  
User.hasMany(Patient, { foreignKey: 'userId', as: 'doctor' });
Patient.belongsTo(User, { foreignKey: 'userId', as: 'doctor' });

Patient.belongsToMany(User, {
    through: 'patient_nurse',
    as: 'nurses',
    foreignKey: 'patientId',
    otherKey: 'nurseId',
  });
  
User.belongsToMany(Patient, {
    through: 'patient_nurse',
    as: 'patients',
    foreignKey: 'nurseId',
    otherKey: 'patientId',
  });


export default User;