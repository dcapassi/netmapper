import * as Yup from "yup";
import Integration from "../models/Integration";
import { Op } from "sequelize";

/*****************************************
//index
//show
//store
//update
//delete
******************************************/

class IntegrationController {
  async show(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const conta = parseInt(req.params.id);
    let validacao = await Integration.findOne({ where: { conta } }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });

    if (validacao == null) {
      return res.status(400).json({ error: "Conta não existe" });
    }
    /**********************************
     * Mostrar usuario
     * *******************************/
    const { dados } = validacao;
    return res.json(dados);
  } // fim do método show

  async store(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      conta: Yup.number().required(),
      dados: Yup.object().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /****************************************************************
     * Garantir que a conta seja única
     * *************************************************************/

    let validacao = await Integration.findAll({
      where: {
        [Op.or]: [{ conta: req.body.conta }, {}],
      },
    }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    if (!(validacao == false)) {
      return res.status(400).json({ error: "Conta já existente" });
    }

    /**********************************
     * Gravar dados no Banco
     * *******************************/

    const { id, conta, dados } = await Integration.create(req.body).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ id, conta, dados });
  } // fim do método store

  async update(req, res) {
    console.log(req.body);

    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      //conta: Yup.number().required(),
      dados: Yup.object().required(),
    });

    if (!(await schema.isValid(req.body))) {
      //return res.status(400).json({ error: "Falha no formato" });
    }

    /****************************************************************
     * Garantir que a conta existe e é do usuário
     * *************************************************************/

    let siteExistente = await Integration.findOne({
      where: {
        [Op.or]: [{ conta: req.params.id }, {}],
      },
    }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });

    const idRecebido = parseInt(req.params.id);
    const idToken = parseInt(res.conta);
    console.log(idRecebido);
    console.log(idToken);

    if (siteExistente == false || idRecebido !== idToken) {
      return res.status(400).json({ error: "Conta não existente" });
    }

    /**********************************
     * Gravar dados no Banco
     * *******************************/

    await siteExistente.update(req.body).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json(req.body);
  } // fim do método update
}

export default new IntegrationController();
