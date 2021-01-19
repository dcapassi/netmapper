//const { Router } = require("express");
//const CadastrosController = require("./src/app/controller/CadastrosController");
import { Router } from "express";
import CadastrosController from "../src/app/controller/CadastrosController";
import SessionController from "../src/app/controller/SessionController";
import SitesController from "../src/app/controller/SitesController";
import MapsController from "../src/app/controller/MapsController";

//Importação do Middleware para validação de Autenticação JWT
import authMiddleware from "../src/app/middlewares/auth";
import authMiddlewareAdm from "../src/app/middlewares/authAdm";

//Multer
import multer from "multer";
import uploadConfig from "./app/middlewares/multer";

const routes = new Router();
const upload = multer(uploadConfig);

//Rotas para o Controlador CadastrosController
routes.get("/cadastros", authMiddlewareAdm, CadastrosController.index);
routes.get("/cadastros/:id", CadastrosController.show);
routes.post("/cadastros", CadastrosController.store);
routes.put("/cadastros/:id", CadastrosController.update);
routes.delete("/cadastros/:id", CadastrosController.delete);

//Rotas para o Controlador Sessão
routes.post("/sessao", SessionController.show);

//Rotas para o Controlador Sites
routes.get("/sites/:id", SitesController.show);
routes.post("/sites", SitesController.store);
routes.put("/sites/:id", authMiddleware, SitesController.update);

//Rotas para o Controlador Maps
routes.get("/maps/:id", MapsController.show);
routes.post("/maps/:id", authMiddleware, upload.single("map"), MapsController.store);

//Middlware usage
/*
//Rotas para o Controlador SalasController
routes.get("/something", authMiddlware, ControllerXPTO.index);
*/

export default routes;
