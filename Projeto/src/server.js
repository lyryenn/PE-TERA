const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Configuração do MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'natalia',
  password: 'Nati@23DB',
  database: '',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Para criar um novo usuário
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hashSenha = await gerarHashSenha(senha); // Obtenha o hash da senha

    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    
    db.query(query, [nome, email, hashSenha], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).send(err.message);
      } else {
        res.status(201).send('Usuário cadastrado com sucesso');
      }
    });
  } catch (error) {
    console.error('Erro ao criar hash da senha:', error);
    res.status(500).send(error.message);
  }
});

// Função para gerar um hash de senha
const gerarHashSenha = async (senha) => {
  const saltRounds = 10;
  return bcrypt.hash(senha, saltRounds);
};

// Para autenticar um usuário
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    
    db.query(query, [email], async (err, result) => {
      if (err) {
        console.error('Erro ao autenticar usuário:', err);
        res.status(500).send(err.message);
      } else {
        if (result.length > 0) {
          const usuario = result[0];
          const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

          if (senhaCorreta) {
            res.status(200).json({ mensagem: 'Login bem-sucedido', usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
          } else {
            res.status(401).send('Credenciais inválidas');
          }
        } else {
          res.status(404).send('Usuário não encontrado');
        }
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${13900}`);
});

