const express = require('express');
const winston = require('winston');
const { User } = require('./models');

const app = express();
const port = 3000;

app.use(express.json());

// Middleware logger menggunakan Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' }),
  ],
});

app.use((req, res, next) => {
  logger.log({
    level: 'info',
    message: `${req.method} ${req.url}`,
    timestamp: new Date().toISOString(),
  });
  next();
});

// Routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    logger.log({
      level: 'error',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.create({ firstName, lastName, email });
    res.json(user);
  } catch (error) {
    logger.log({
      level: 'error',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    logger.log({
      level: 'error',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const { firstName, lastName, email } = req.body;
      await user.update({ firstName, lastName, email });
      res.json(user);
    }
  } catch (error) {
    logger.log({
      level: 'error',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      await user.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    logger.log({
      level: 'error',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});