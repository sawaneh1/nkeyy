import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
  },

  //   timestamps: true,

  createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model("customer", CustomerSchema);
export default Customer;
