import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema

const foodSchema = new Schema ({
  name: {
    type: String,
    required: true},
  category: {
    type: String,
    required: true},
  vitamins: {
    type: String,
    required: true},
  reactions: [reactionSchema],
  owner: [{type: Schema.Types.ObjectId, ref: 'Profile'}]
})

const Food = mongoose.model('Food', foodSchema)

export {

}