import { Sequelize } from "sequelize";
import Usuarios from "../app/models/Usuarios";
import Sites from "../app/models/Sites";
import Maps from "../app/models/Maps";
import Switches from "../app/models/Switches";
import Aps from "../app/models/Aps";

import databaseConfig from "../configs/databaseConfig";

const models = [Usuarios, Sites, Maps, Switches, Aps];

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
