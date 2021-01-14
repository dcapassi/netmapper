"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "usuarios",
      [
        {
          id: 1000,
          nome: "Diego Capassi",
          cpf: "353-123-456-78",
          email: "diego.capassi@senac.com.br",
          senha_hash:
            "$2a$08$TTH8YNzbzC9So4xPDthP..RSRjnQ1ByrumLt.xtIvLZaH8DcOH8SW",
          created_at: new Date(),
          updated_at: new Date(),
          conta: 2021000001,
          tipo: 1,
        },
        {
          id: 1001,
          nome: "Matheus Souza",
          cpf: "410-123-456-78",
          email: "matheus.sousa@senac.com.br",
          senha_hash:
            "$2a$08$TTH8YNzbzC9So4xPDthP..RSRjnQ1ByrumLt.xtIvLZaH8DcOH8SW",
          created_at: new Date(),
          updated_at: new Date(),
          conta: 2021000002,
          tipo: 1,
        },
        {
          id: 1002,
          nome: "Matheus Santos",
          cpf: "437-123-456-78",
          email: "matheus.santos@senac.com.br",
          senha_hash:
            "$2a$08$TTH8YNzbzC9So4xPDthP..RSRjnQ1ByrumLt.xtIvLZaH8DcOH8SW",
          created_at: new Date(),
          updated_at: new Date(),
          conta: 2021000003,
          tipo: 1,
        },
        {
          id: 999,
          nome: "Administrador",
          cpf: "xxx-xxx-xxx-xx",
          email: "admin@senac.com.br",
          senha_hash:
            "$2a$08$TTH8YNzbzC9So4xPDthP..RSRjnQ1ByrumLt.xtIvLZaH8DcOH8SW",
          created_at: new Date(),
          updated_at: new Date(),
          conta: 2021000004,
          tipo: 3,
        },
        {
          id: 900,
          nome: "Funcionario",
          cpf: "yyy-yyy-yyy-yy",
          email: "biblioteca@senac.com.br",
          senha_hash:
            "$2a$08$TTH8YNzbzC9So4xPDthP..RSRjnQ1ByrumLt.xtIvLZaH8DcOH8SW",
          created_at: new Date(),
          updated_at: new Date(),
          conta: 2021000005,
          tipo: 2,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("usuarios", null, {});
  },
};
