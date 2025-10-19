const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Тестовый маршрут
router.get('/test', (req, res) => {
  res.json({ message: 'Маршруты работают!' });
});

router.get('/register-test', (req, res) => {
  res.json({ 
    message: 'Эндпоинт регистрации доступен' 
  });
});

// РЕГИСТРАЦИЯ
router.post('/register', async (req, res) => {
  try {
    console.log('Получен запрос на регистрацию:', req.body);
    
    const { firstName, lastName, email, password } = req.body;

    // Проверяем обязательные поля
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Все поля обязательны для заполнения'
      });
    }

    // Проверяем, есть ли уже пользователь
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Пользователь с таким email уже существует'
      });
    }

    // Создаём пользователя
    const newUser = await User.create({
      firstName,
      lastName, 
      email,
      password
    });

    console.log('Пользователь создан:', newUser.email);

    res.status(201).json({
      success: true,
      message: 'Пользователь успешно зарегистрирован',
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });

  } catch (error) {
    console.log('Ошибка регистрации:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при регистрации',
      error: error.message
    });
  }
});

module.exports = router;
