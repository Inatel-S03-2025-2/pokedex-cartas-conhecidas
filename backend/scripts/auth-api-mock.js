const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
// generate at https://generate-secret.vercel.app/32
SECRET = '353de3c81ec4934f9f8421f68e085492';

// Usuários mock para teste (apenas users externos)
const users = [
  {
    userId: 100,
    email: 'user@test.com',
    password: 'senha123', 
    role: 'user'
  },
  {
    userId: 101,
    email: 'user2@test.com',
    password: 'senha123', 
    role: 'user'
  }
];

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', { email, password });
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Credenciais inválidas'
    });
  }
  
  // Gerar token do AuthAPI
  const token = jwt.sign(
    { email: user.email },
    SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({
    externalToken: token
  });
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'AuthAPI Mock' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`AuthAPI Mock rodando em http://localhost:${PORT}`);
  console.log('Usuários disponíveis:');
  users.forEach(user => {
    console.log(`- ${user.email}:${user.password} (role: ${user.role})`);
  });
});