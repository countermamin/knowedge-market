import mongoose, { model, models, Schema } from "mongoose";

const AddressSchema = new Schema({
  userEmail: { type: String, unique: true, required: true },
  name: String,
  email: String,
  phoneNumber: Number,
  address: String,
  zipCode: String,
  city: String,
  country: String,
});

export const Address = models?.Address || model('Address', AddressSchema);