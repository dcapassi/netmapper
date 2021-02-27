import { Router } from "express";
import CadastrosController from "../src/app/controller/CadastrosController";
import SessionController from "../src/app/controller/SessionController";
import SitesController from "../src/app/controller/SitesController";
import MapsController from "../src/app/controller/MapsController";
import ApsController from "../src/app/controller/ApsController";
import IntegrationController from "../src/app/controller/IntegrationController";

//Importação do Middleware para validação de Autenticação JWT
import authMiddleware from "../src/app/middlewares/auth";
import authMiddlewareAdm from "../src/app/middlewares/authAdm";

//Multer
import multer from "multer";
import uploadConfig from "./app/middlewares/multer";

//Router
const routes = new Router();
const upload = multer(uploadConfig);

//Rotas para o Controlador CadastrosController
routes.get("/cadastros", authMiddlewareAdm, CadastrosController.index);
routes.get("/cadastros/:id", authMiddlewareAdm, CadastrosController.show);
routes.post("/cadastros", authMiddlewareAdm, CadastrosController.store);
routes.put("/cadastros/:id", authMiddlewareAdm, CadastrosController.update);
routes.delete("/cadastros/:id", authMiddlewareAdm, CadastrosController.delete);

//Rotas para o Controlador Sessão
routes.post("/sessao", SessionController.show);

//Rotas para o Controlador Sites
routes.get("/sites/:id", authMiddleware,SitesController.show);
routes.post("/sites", authMiddleware,SitesController.store);
routes.put("/sites/:id", authMiddleware,authMiddleware, SitesController.update);

//Rotas para o Controlador Sites
routes.get("/integration/:id", authMiddleware, IntegrationController.show);
routes.post("/integration", authMiddleware, IntegrationController.store);
routes.put("/integration/:id", authMiddleware, IntegrationController.update);

//Rotas para o Controlador Maps
routes.get("/maps/:id", MapsController.show);
routes.post(
  "/maps/:id",
  authMiddleware,
  upload.single("map"),
  MapsController.store
);

//Rotas para o Controlador Aps
routes.get("/aps/:id", ApsController.show);
routes.post("/aps", authMiddleware, ApsController.store);
routes.put("/aps", authMiddleware, ApsController.update);

export default routes;
