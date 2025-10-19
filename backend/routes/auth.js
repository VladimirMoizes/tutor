const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Функция для создания JWT токена
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// РЕГИСТРАЦИЯ
router.post("/register", async (req, res) => {
  try {
    console.log("Получен запрос на регистрацию:", req.body);

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Все поля обязательны для заполнения",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Пользователь с таким email уже существует",
      });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const token = createToken(newUser._id);

    console.log("Пользователь создан:", newUser.email);

    res.status(201).json({
      success: true,
      message: "Пользователь успешно зарегистрирован",
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Ошибка регистрации:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при регистрации",
      error: error.message,
    });
  }
});

// ВХОД
router.post("/login", async (req, res) => {
  try {
    console.log("Получен запрос на вход:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email и пароль обязательны",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Пользователь с таким email не найден",
      });
    }

    const isPasswordCorrect = await user.correctPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Неверный пароль",
      });
    }

    const token = createToken(user._id);

    console.log("Успешный вход:", user.email);

    res.json({
      success: true,
      message: "Вход выполнен успешно",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Ошибка входа:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при входе",
      error: error.message,
    });
  }
});

// ПОЛУЧЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
router.get("/me", protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ошибка при получении данных пользователя",
    });
  }
});

// ОБНОВЛЕНИЕ ПРОФИЛЯ
router.patch("/profile", protect, async (req, res) => {
  try {
    console.log("Запрос на обновление профиля:", req.user.email);

    const { firstName, lastName, email } = req.body;

    if (!firstName && !lastName && !email) {
      return res.status(400).json({
        success: false,
        message: "Не переданы данные для обновления",
      });
    }

    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Пользователь с таким email уже существует",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email }),
      },
      { new: true, runValidators: true }
    );

    console.log("Профиль обновлён:", updatedUser.email);

    res.json({
      success: true,
      message: "Профиль успешно обновлён",
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.log("Ошибка обновления профиля:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при обновлении профиля",
      error: error.message,
    });
  }
});

// УДАЛЕНИЕ АККАУНТА
router.delete("/account", protect, async (req, res) => {
  try {
    console.log("Запрос на удаление аккаунта:", req.user.email);
    console.log("Полученный пароль:", req.body.password);

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Для удаления аккаунта подтвердите пароль",
      });
    }

    // Находим пользователя с паролем (select: +password)
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
    }

    console.log("Проверяем пароль...");

    // Проверяем пароль
    const isPasswordCorrect = await user.correctPassword(password);

    console.log("Результат проверки пароля:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Неверный пароль",
      });
    }

    // Удаляем пользователя
    await User.findByIdAndDelete(req.user._id);

    console.log("Аккаунт удалён:", req.user.email);

    res.json({
      success: true,
      message: "Аккаунт успешно удалён",
    });
  } catch (error) {
    console.log("Ошибка удаления аккаунта:", error);
    console.log("Детали ошибки:", error.message);
    res.status(500).json({
      success: false,
      message: "Ошибка при удалении аккаунта",
      error: error.message,
    });
  }
});

module.exports = router;
