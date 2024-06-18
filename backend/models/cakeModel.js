import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const cakeModel = mongoose.models.cake || mongoose.model("cake", cakeSchema);

export default cakeModel;
