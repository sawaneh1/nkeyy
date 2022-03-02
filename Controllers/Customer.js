import Customer from "../Model/CustomerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const getCustomer = async (req, res, next) => {
  try {
    console.log("customer");
    res.json("gettong  customers");
  } catch (error) {
    console.log("err");
  }
};

export const signup = async (req, res, next) => {
  const { phoneNumber, firstName, lastName, email, password } = req.body;

  try {
    console.log(req.body);
    const OldCustomer = await Customer.findOne({ phoneNumber });
    // const hashedPassword = await hashPassword(password);

    const hashedPassword = await bcrypt.hash(password, 12);

    const newCustomer = new Customer({
      firstName,
      phoneNumber,
      lastName,
      email,
      password: hashedPassword,
    });
    if (OldCustomer)
      return res.status(400).json({ message: "Customer already exists" });

    const token = jwt.sign(
      { userId: newCustomer._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // newCustomer.token = token;
    await newCustomer.save();
    res.json({
      data: newCustomer,
      token,
    });
  } catch (error) {
    next(error);
    console.log("this an erro", error.message);
  }
};
