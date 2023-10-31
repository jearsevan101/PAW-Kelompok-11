const Customer = require("../models/customer.model");
const jwt = require("jsonwebtoken");

const registerCustomer = async (req, res) => {
  const { username, email, password, nama, umur} = req.body;
  const sewa = "TIDAK_MENYEWA";

  if (!["MENYEWA", "TIDAK_MENYEWA", "MENGAJUKAN"].includes(sewa)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  try {
    const checkUsername = await Customer.findOne({username});
    if (checkUsername) {
      return res.status(400).json({error: "Username already taken"});
    }
    const customer = await Customer.create({
      username,
      email,
      password,
      nama,
      umur,
      sewa,
    });

    res.status(200).json({messag: "Customer registered successfully", customer: customer});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginCustomer = async (req, res) => {
  const {username, password} = req.body;

  try {
    const customer = await Customer.findOne({username});

    if (!customer) {
      return res.status(404).json({error: "Customer not found."});
    }

    const passwordMatch = (customer.password === password);
    if (!passwordMatch) {
      return res.status(400).json({error: "invalid password"});
    }

    const token = jwt.sign({id: customer._id, username: customer.username}, process.env.JWT_SECRET);

    const data = {
      customer: customer,
      token: token,
    };

    return res.status(200).json({
      message: "login berhasil",
      data: data,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const logoutCustomer = async (req, res) => {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({message: "No customer is logged in"});
  }
  try{
    res.status(200)
      .clearCookie("token")
      .json({message: "Logout success"});
  }catch(err){
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
};
