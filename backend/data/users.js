import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Jersey",
    email: "jersey@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Joy",
    email: "joy@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
