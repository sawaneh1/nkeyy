import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  businessType: {
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
