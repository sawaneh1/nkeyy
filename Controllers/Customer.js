import Customer from "../Model/CustomerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const registerCustomer = async (req, res, next) => {
  try {
    console.log(req.body);
    const { phoneNumber, firstName, lastName, email, password } = req.body;

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
      { customerId: newCustomer._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // newCustomer.token = token;
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      id: newCustomer._id.toHexString(),
    };

    await newCustomer.save();
    res.json({
      data: data,
      token,
    });
  } catch (error) {
    console.log("this an erro", error.message);

    next(error);
  }
};

export const loginCustomer = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const customer = await Customer.findOne({ phoneNumber });
    if (!customer) return res.json("you are not authorize");
    // const validPassword = await validatePassword(password, user.password);
    // const validPassword = bcrypt.compare(password, .password);
    // if (!validPassword) return next(new Error("Password is not correct"));
    const token = jwt.sign(
      { customerId: customer._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // await User.findByIdAndUpdate(user._id, { accessToken });
    const { firstName, lastName, email, _id } = customer;

    res.status(200).json({
      data: { firstName, lastName, phoneNumber, email, id: _id.toHexString() },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({});

    const data = customers.map((customer) => {
      return {
        firstName: customer.firstName,
        lastName: customer.lastName,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
        id: customer._id,
      };
    });

    res.json({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    console.log("req", req.params);
    console.log(customerId);
    const customer = await Customer.findById(
      mongoose.Types.ObjectId(customerId)
    );
    if (!customer) return res.json("no customer found....");

    const { firstName, lastName, phoneNumber, email, _id } = customer;

    const data = {
      firstName,
      lastName,
      phoneNumber,
      email,
      id: _id.toHexString(),
    };
    console.log("test", _id.toHexString(), "nes");
    console.log(data);

    res.json(data);
  } catch (error) {
    console.log("this is an arror", error);
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const update = req.body;
    const customerId = req.params.customerId;
    await Customer.findByIdAndUpdate(customerId, update);
    const customer = await Customer.findById(customerId);
    const { firstName, lastName, phoneNumber, email, _id } = customer;

    const data = {
      firstName,
      lastName,
      phoneNumber,
      email,
      id: _id.toHexString(),
    };

    res.status(200).json({
      data: data,
      message: "customer has been updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    await Customer.findByIdAndDelete(customerId);
    res.status(200).json({
      data: null,
      message: "Customer has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
