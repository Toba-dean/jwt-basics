const jwt = require('jsonwebtoken');
const { BadRequestError } = require("../errors");

const login = (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const id = new Date().getDate()
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
  if(username && password){
    return res.status(200).json({ msg: 'User created', token, username });
  }
  throw new BadRequestError('Please enter username and password', 400)
}

const dashboard = (req, res) => {
  const { id, username } = req.user;
  const secret = Math.floor((Math.random() * 100) + 1);
  res.status(200).json({ msg: `Hello ${username},`, secret: `Here is your authorized data, your lucky number is ${secret}` });
}

module.exports = { login, dashboard } 