import Business from "../Model/BusinessModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const registerBusiness = async (req, res, next) => {
  try {
    const { phoneNumber, businessName, businessType, email, password } =
      req.body;

    console.log(req.body);
    const oldBusiness = await Business.findOne({ phoneNumber });
    // const hashedPassword = await hashPassword(password);
    if (oldBusiness)
      return res.status(400).json({ message: "business already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);

    const newBusiness = new Business({
      businessName,
      phoneNumber,
      businessType,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { businessId: newBusiness._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // newCustomer.token = token;

    const data = {
      businessName,
      businessType,
      email,
      phoneNumber,
      id: newBusiness._id.toHexString(),
    };

    await newBusiness.save();
    res.json({
      data: data,
      token,
    });
  } catch (error) {
    console.log("this an error", error.message);

    next(error);
  }
};

export const loginBusiness = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const busisnes = await Business.findOne({ phoneNumber });
    if (!busisnes) return res.json("you are not authorize");
    // const validPassword = await validatePassword(password, user.password);
    // const validPassword = bcrypt.compare(password, .password);
    // if (!validPassword) return next(new Error("Password is not correct"));
    const token = jwt.sign(
      { businessId: busisnes._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // await User.findByIdAndUpdate(user._id, { accessToken });
    const { businessName, businessType, email, _id } = busisnes;
    const data = {
      phoneNumber,
      businessName,
      businessType,
      email,
      id: _id.toHexString(),
    };
    res.status(200).json({
      data: data,
      token,
    });
  } catch (error) {
    next(error);
  } // "businessName":"SawanehTech",
  // "businessType":"Tech",
};

export const getBusinesses = async (req, res, next) => {
  try {
    const businesses = await Business.find({});
    // const { firstName, lastName, email, phoneNumber } = customers;

    const data = businesses.map((business) => {
      return {
        businessName: business.businessName,
        businessType: business.businessType,
        phoneNumber: business.phoneNumber,
        email: business.email,
        id: business._id,
      };
    });

    res.json({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getBusiness = async (req, res, next) => {
  try {
    const businessId = req.params.businessId;
    console.log("req", req.params);
    console.log(businessId);
    const business = await Business.findById(
      mongoose.Types.ObjectId(businessId)
    );
    if (!business) return res.json("no business found....");

    const { businessName, businessType, phoneNumber, email, _id } = business;

    const data = {
      businessName,
      businessType,
      phoneNumber,
      email,
      id: _id.toHexString(),
    };
    console.log(data);

    res.json(data);
  } catch (error) {
    console.log("this is an arror", error);
    next(error);
  }
};

export const updateBusiness = async (req, res, next) => {
  try {
    const update = req.body;
    const businessId = req.params.businessId;
    await Business.findByIdAndUpdate(businessId, update);
    const business = await Business.findById(businessId);
    const { businessName, businessType, phoneNumber, email, _id } = business;

    const data = {
      businessName,
      businessType,
      phoneNumber,
      email,
      id: _id.toHexString(),
    };

    res.status(200).json({
      data: data,
      message: "business has been updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBusiness = async (req, res, next) => {
  try {
    const businessId = req.params.businessId;
    await Business.findByIdAndDelete(businessId);
    res.status(200).json({
      data: null,
      message: "business has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
