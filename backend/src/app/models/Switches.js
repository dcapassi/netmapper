import Sequelize, { Model } from "sequelize";

class switches extends Model {
  static init(sequelize) {
    super.init(
      {
        conta: Sequelize.INTEGER,
        mapId: Sequelize.STRING,
        dados: Sequelize.JSON,
      },
      {
        freezeTableName: true,
        sequelize,
        timestamps: false,
        underscored: false,
      }
    );

    return this;
  }
}

export default switches;
