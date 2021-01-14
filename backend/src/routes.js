//const { Router } = require("express");
//const CadastrosController = require("./src/app/controller/CadastrosController");
import { Router } from "express";
import CadastrosController from "../src/app/controller/CadastrosController";
import SessionController from "../src/app/controller/SessionController";

//Importação do Middleware para validação de Autenticação JWT
import authMiddleware from "../src/app/middlewares/auth";
import authMiddlewareAdm from "../src/app/middlewares/authAdm";


const routes = new Router();

//Rotas para o Controlador CadastrosController
routes.get("/cadastros", authMiddlewareAdm, CadastrosController.index);
routes.get("/cadastros/:id", CadastrosController.show);
routes.post("/cadastros", CadastrosController.store);
routes.put("/cadastros/:id", CadastrosController.update);
routes.delete("/cadastros/:id", CadastrosController.delete);

//Rotas para o Controlador Sessão
routes.post("/sessao", SessionController.show);

//Middlware usage
/*
//Rotas para o Controlador SalasController
routes.get("/something", authMiddlware, ControllerXPTO.index);
*/

export default routes;
