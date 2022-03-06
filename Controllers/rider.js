import Rider from "../Model/RiderModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const registerRider = async (req, res, next) => {
  try {
    console.log(req.body);
    const { phoneNumber, firstName, lastName, email, password } = req.body;

    const OldRider = await Rider.findOne({ phoneNumber });
    // const hashedPassword = await hashPassword(password);

    const hashedPassword = await bcrypt.hash(password, 12);

    const newRider = new Rider({
      firstName,
      phoneNumber,
      lastName,
      email,
      password: hashedPassword,
    });
    if (OldRider)
      return res.status(400).json({ message: "rider already exists" });

    const token = jwt.sign({ riderId: newRider._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // newrider.token = token;
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      id: newRider._id.toHexString(),
    };

    await newRider.save();
    res.json({
      data: data,
      token,
    });
  } catch (error) {
    console.log("this an erro", error.message);

    next(error);
  }
};

export const loginRider = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const rider = await Rider.findOne({ phoneNumber });
    if (!rider) return res.status(401).json("access denied");
    // const validPassword = await validatePassword(password, user.password);
    // const validPassword = bcrypt.compare(password, .password);
    // if (!validPassword) return next(new Error("Password is not correct"));
    const token = jwt.sign({ riderId: rider._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // await User.findByIdAndUpdate(user._id, { accessToken });
    const { firstName, lastName, email, _id } = rider;

    res.status(200).json({
      data: { firstName, lastName, phoneNumber, email, id: _id.toHexString() },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getRiders = async (req, res, next) => {
  try {
    const riders = await Rider.find({});

    const data = riders.map((rider) => {
      return {
        firstName: rider.firstName,
        lastName: rider.lastName,
        phoneNumber: rider.phoneNumber,
        email: rider.email,
        id: rider._id,
      };
    });

    res.json({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getRider = async (req, res, next) => {
  try {
    const riderId = req.params.riderId;
    console.log("req from rider", req.params);
    // console.log(riderId);
    const rider = await Rider.findById(mongoose.Types.ObjectId(riderId));
    if (!rider) return res.status(404).json("no rider found....");

    const { firstName, lastName, phoneNumber, email, _id } = rider;

    const data = {
      firstName,
      lastName,
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

export const updaterider = async (req, res, next) => {
  try {
    const update = req.body;
    const riderId = req.params.riderId;
    await Rider.findByIdAndUpdate(riderId, update);
    const rider = await Rider.findById(riderId);
    const { firstName, lastName, phoneNumber, email, _id } = rider;

    const data = {
      firstName,
      lastName,
      phoneNumber,
      email,
      id: _id.toHexString(),
    };

    res.status(200).json({
      data: data,
      message: "rider has been updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleterider = async (req, res, next) => {
  try {
    const riderId = req.params.riderId;
    await Rider.findByIdAndDelete(riderId);
    res.status(200).json({
      data: null,
      message: "rider has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
