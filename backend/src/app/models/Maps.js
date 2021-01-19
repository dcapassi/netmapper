import Sequelize, { Model } from "sequelize";

class maps extends Model {
  static init(sequelize) {
    super.init(
      {
        conta: Sequelize.INTEGER,
        mapId: Sequelize.STRING,
        img: Sequelize.STRING,
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

export default maps;
