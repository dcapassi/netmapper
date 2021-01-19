import * as Yup from "yup";
import Maps from "../models/Maps";
import { Op } from "sequelize";

/*****************************************
//index
//show
//store
//update
//delete
******************************************/

class MapsController {
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
    const { id } = req.params;
    let validacao = await Maps.findOne({ where: { mapId: id } }).catch(
      (err) => {
        return res.status(400).json({ erro: err.name });
      }
    );

    if (validacao == null) {
      return res.status(400).json({ error: "Mapa não existe" });
    }
    /**********************************
     * Mostrar usuario
     * *******************************/
    return res.json(validacao);
  } // fim do método show

  async store(req, res) {
    const { filename } = req.file;

    console.log(filename);

    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    const conta = res.conta;

    /****************************************************************
     * Garantir que a conta seja única
     * *************************************************************/

    let validacao = await Maps.findAll({
      where: {
        [Op.or]: [{ mapId: req.params.id }, {}],
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
    const obj = await Maps.create({
      conta,
      mapId: req.params.id,
      img: filename,
    }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    let objJson = { conta: obj.conta, mapId: obj.mapId, img: obj.img };

    return res.json(objJson);
  } // fim do método store
}

export default new MapsController();
