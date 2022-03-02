import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
  BusinessName: {
    type: String,
    required: true,
  },
  BusinessType: {
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

const Business = mongoose.model("business", BusinessSchema);
export default Business;
