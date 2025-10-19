const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // 1. Получаем токен из заголовка
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. Проверяем наличие токена
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Доступ запрещён. Токен отсутствует.",
      });
    }

    // 3. Проверяем валидность токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Находим пользователя по ID из токена
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Пользователь не найден.",
      });
    }

    // 5. Добавляем пользователя в запрос
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Невалидный токен.",
    });
  }
};

module.exports = { protect };
