import mongoose from "mongoose";

const RiderSchema = new mongoose.Schema({
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
  createdAt: { type: Date, default: Date.now },

  //   timestamps: true,
  //   timestamps: { createdAt: true, updatedAt: false },
});

const Rider = mongoose.model("rider", RiderSchema);
export default Rider;
