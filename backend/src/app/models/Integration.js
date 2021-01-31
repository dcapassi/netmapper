import Sequelize, { Model } from "sequelize";

class integration extends Model {
  static init(sequelize) {
    super.init(
      {
        conta: Sequelize.INTEGER,
        dados: Sequelize.JSON,
      },
      {
        freezeTableName: true,
        sequelize,
        timestamps: false,
      }
    );

    return this;
  }
}

export default integration;
