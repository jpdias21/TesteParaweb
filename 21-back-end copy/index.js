const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const usuarios = []; // Aqui ficam os cadastros

// Rota de cadastro
app.post("/api/registro", async (req, res) => {
  const { nome, sobrenome, email, telefone, senha } = req.body;

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = { nome, sobrenome, email, telefone, senha: senhaCriptografada };

  usuarios.push(novoUsuario);

  res.json({ mensagem: "Usuário registrado com sucesso!" });
});

// ✅ Rota para listar todos os usuários
app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
