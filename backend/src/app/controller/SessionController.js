import User from "../models/Usuarios";
import jwt from "jsonwebtoken";
import authConfig from "../../configs/authConfig";
import * as Yup from "yup";

class SessionController {
  async show(req, res) {
    //Input Validation
    const schema = Yup.object().shape({
      //email: Yup.string().email().required(),
      email: Yup.string().required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha de validação" });
    }

    const { email, senha } = req.body;

    const user = await User.findOne({ where: { email } }).catch((err) => {
      return res.status(400).json({ erro: err.name });
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário não existe" });
    }

    if (!(await user.checkPassword(senha))) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const { id, nome, tipo, conta } = user;

    return res.json({
      usuario: { tipo, id, nome, email, conta },
      token: jwt.sign({ id, tipo, nome, email, conta }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
