const errorMessage = (field) => ({
  'string.empty': `Поле ${field} не может быть пустым`,
  'string.min': `Поле ${field} должно быть не меньше 2 символов`,
  'string.max': `Поле ${field} должно быть не больше 30 символов`,
  'any.required': `Поле ${field} обязательно`,
  'string.email': `Неверный формат поля  ${field}`,
  'string.pattern.base': `${field} должен быть не менее 8 символов.Может содержать только заглавные и прописные буквы латинского алфавита, цифры и служебные символы @*#-_%|`,
});

const existingUser = 'Такой пользователь уже существует';
module.exports = {
  errorMessage,
  existingUser
};