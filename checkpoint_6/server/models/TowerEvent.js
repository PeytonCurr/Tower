import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 1000 },
  coverImg: { type: String, required: true, maxLength: 500 },
  location: { type: String, required: true, minLength: 3, maxLength: 50 },
  capacity: { type: Number, required: true, min: 1, max: 10000 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, enum: ["concert", "convention", "sport", "digital"], required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
})