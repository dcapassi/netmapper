import * as Yup from "yup";
import Aps from "../models/Aps";
import { Op } from "sequelize";

/*****************************************
//index
//show
//store
//update
//delete
******************************************/

class ApsController {
  async show(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const mapId = req.params.id;
    let validacao = await Aps.findOne({ where: { mapId } }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });

    if (validacao == null) {
      return res.status(400).json({ error: "Não existem APs" });
    }
    /**********************************
     * Mostrar Aps
     * *******************************/
    const { dados } = validacao;
    return res.json(dados);
  } // fim do método show

  async store(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    let schema = Yup.object().shape({
      dados: Yup.object().required(),
      mapId: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /****************************************************************
     * Garantir que a conta seja única
     * *************************************************************/

    let validacao = await Aps.findAll({
      where: {
        [Op.or]: [{ mapId: req.body.mapId }, {}],
      },
    }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    if (!(validacao == false)) {
      return res.status(400).json({ error: "Mapa já existente" });
    }

    /**********************************
     * Gravar dados no Banco
     * *******************************/

    const { id, conta, mapId, dados } = await Aps.create({
      conta: res.conta,
      mapId: req.body.mapId,
      dados: req.body.dados,
    }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ id, mapId, conta, dados });
  } // fim do método store

  async update(req, res) {
    //console.log(req.body);

    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      //conta: Yup.number().required(),
      dados: Yup.object().required(),
      mapId: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /****************************************************************
     * Garantir que a conta existe e é do usuário
     * *************************************************************/

    let siteExistente = await Aps.findOne({
      where: {
        [Op.or]: [{ mapId: req.body.mapId }, {}],
      },
    }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });

    if (siteExistente == null) {
      return res.status(400).json({ error: "Aps não existente no mapa" });
    }

    /**********************************
     * Gravar dados no Banco
     * *******************************/

    await siteExistente
      .update({
        conta: res.conta,
        mapId: req.body.mapId,
        dados: req.body.dados,
      })
      .catch((err) => {
        return res.status(400).json({ erro: err.name });
      });
    return res.json(req.body);
  } // fim do método update
}

export default new ApsController();
