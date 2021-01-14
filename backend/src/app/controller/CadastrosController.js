import * as Yup from "yup";
import User from "../models/Usuarios";
import { Op } from "sequelize";

/****************************************
Rota para cadastrar Usuários:

Campos obrigatórios:
nome:
cpf:
email:
senha:
tipo: (1 | 2 | 3 | 4) onde 1 = aluno, 2 = funcionário e 3 = administrador 4 = professor

*****************************************/
//index
//show
//store
//update
//delete

class CadastrosController {
  async index(req, res) {
    /**********************************
     * Mostrar todos os usuarios
     * *******************************/
    const resultado = await User.findAll({
      attributes: ["id", "nome", "cpf", "email", "conta"],
    }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json(resultado);
  } // fim do método index

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
    const { id } = req.params;
    let validacao = await User.findByPk(id).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });

    if (validacao == null) {
      return res.status(400).json({ error: "Usuário não existe" });
    }
    /**********************************
     * Mostrar usuario
     * *******************************/
    const { nome, cpf } = validacao;
    return res.json({ id, nome, cpf });
  } // fim do método show

  async store(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required(),
      email: Yup.string().required(),
      senha: Yup.string().required(),
      tipo: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /****************************************************************
     * Garantir que o email e CPF sejam unicos
     * *************************************************************/

    let validacao = await User.findAll({
      where: {
        [Op.or]: [{ email: req.body.email }, { cpf: req.body.cpf }],
      },
    }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    if (!(validacao == false)) {
      return res.status(400).json({ error: "Email ou CPF já existente" });
    }

    /**********************************
     * Gravar dados no Banco
     * *******************************/

    const { id, nome, cpf, email } = await User.create(req.body).catch(
      (err) => {
        return res.status(400).json({ erro: err.name });
      }
    );
    return res.json({ id, nome, cpf, email });
  } // fim do método store

  async update(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      cpf: Yup.string().min(6),
      senha: Yup.string().when("senhaAntiga", (senhaAntiga, field) =>
        senhaAntiga ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { id } = req.params;
    let userExistente = await User.findByPk(id).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });

    if (userExistente == null) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    /****************************************************************
     * Garantir que o email e CPF sejam unicos
     * *************************************************************/

    let validacao = await User.findAll({
      where: {
        [Op.or]: [{ email: req.body.email }, { cpf: req.body.cpf }],
      },
    }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    if (!(validacao == false)) {
      return res.status(400).json({ error: "Email ou CPF já existente" });
    }

    const { senha, senhaAntiga } = req.body;

    if (!(senha && (await userExistente.checkPassword(senhaAntiga)))) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    /**********************************
     * Update do Usuário
     * *******************************/

    const { nome, cpf, email } = req.body;
    await userExistente.update(req.body).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ nome, cpf, email });
  } // fim do método udpate

  async delete(req, res) {
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
    const { id } = req.params;
    let userExistente = await User.findByPk(id).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });

    if (userExistente == null) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    /**********************************
     * Remove o usuário
     * *******************************/
    const respostaRemoção = await userExistente.destroy().catch((err) => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ "usuário removido": id });
  } // fim do método udpate
}

export default new CadastrosController();
