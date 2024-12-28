import {Sequelize} from 'sequelize';
import sequelize from '../config/database.js';

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
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    },
    {
      timestamps: true,
      freezeTableName: true, // Prevent Sequelize from pluralizing table names
    }
  );
  
  export default User;