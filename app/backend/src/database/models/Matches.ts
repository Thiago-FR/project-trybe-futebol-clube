import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Users from './Users';
// import OtherModel from './OtherModel';

class Matches extends Model {
  public id: number;
  public team_name: string;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  home_team: {
    type: INTEGER
  },
  home_team_goals: {
    type: INTEGER
  },
  away_team: {
    type: INTEGER
  },
  away_team_goals: {
    type: INTEGER
  },
  in_progress: {
    type: BOOLEAN
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

 Matches.belongsTo(Users, { foreignKey: 'id', as: 'user' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
