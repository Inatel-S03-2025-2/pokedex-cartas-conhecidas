const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

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
    { userId: user.userId, email: user.email, role: user.role },
    'auth-api-secret',
    { expiresIn: '24h' }
  );
  
  res.json({
    user: {
      userId: user.userId,
      email: user.email,
      role: user.role
    },
    token: token
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