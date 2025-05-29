const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Funcionalidade nativa do express


const usuarios = []; // Aqui ficam os cadastros

// Rota de cadastro
app.post("/api/registro", async (req, res) => {
  const { nome, sobrenome, email, telefone, senha } = req.body;

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = { nome, sobrenome, email, telefone, senha: senhaCriptografada };

  usuarios.push(novoUsuario);

  res.json({ mensagem: "Usuário registrado com sucesso!" });
});
// Rota de Login
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  // 1. Verifica se o usuário existe
  const usuario = usuarios.find(user => user.email === email);
  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  // 2. Compara a senha (criptografada)
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return res.status(401).json({ mensagem: "Senha incorreta" });
  }

  // 3. Se tudo estiver certo, retorna sucesso
  res.json({ mensagem: "Login realizado!", nome: usuario.nome });
});

// ✅ Rota para listar todos os usuários
app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
