const users = require("data/users.json");
class InMemoryUserService {
  signInCredentials(email, password) {
    const user = users.find((user) => {
      const emailFound = email === user.email;
      const isPasswordCorrect = password === user.password;
      const userFound = emailFound && isPasswordCorrect;
      return userFound;
    });
    if (!user) {
      throw new Error("Неправильный адрес электронной почты или пароль");
    }
    return user;
  }
}

exports.userService = new InMemoryUserService();