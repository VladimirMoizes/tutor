const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Имя обязательно"],
      trim: true,
      maxlength: [50, "Имя не может быть длиннее 50 символов"],
    },
    lastName: {
      type: String,
      required: [true, "Фамилия обязательна"],
      trim: true,
      maxlength: [50, "Фамилия не может быть длиннее 50 символов"],
    },
    email: {
      type: String,
      required: [true, "Email обязателен"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Пожалуйста, введите корректный email"],
    },
    password: {
      type: String,
      required: [true, "Пароль обязателен"],
      minlength: [6, "Пароль должен быть не менее 6 символов"],
      select: false, // не возвращать пароль при запросах
    },
  },
  {
    timestamps: true, // добавляет createdAt и updatedAt автоматически
  }
);

// Хешируем пароль перед сохранением
userSchema.pre("save", async function (next) {
  // Если пароль не изменялся - пропускаем
  if (!this.isModified("password")) return next();

  // Хешируем пароль
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Метод для проверки пароля
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
