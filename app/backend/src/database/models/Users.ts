import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Users extends Model {
  public id: number;
  public team_name: string;
}

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: INTEGER
  },
  role: {
    allowNull: false,
    type: INTEGER
  },
  email: {
    allowNull: false,
    type: INTEGER
  },
  password: {
    allowNull: false,
    type: INTEGER
  }
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Users;
