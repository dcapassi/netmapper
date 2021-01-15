import { Sequelize } from "sequelize";
import Usuarios from "../app/models/Usuarios";
import Sites from "../app/models/Sites";


import databaseConfig from "../configs/databaseConfig";

const models = [
  Usuarios,
  Sites
];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
