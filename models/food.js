import mongoose from "mongoose";

const Schema = mongoose.Schema

const reactionSchema = new Schema ({
  text: {type: String, required: true},
    potentialAllergen: String,
    potentialCondition: String,  
    owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
  }, {
  timestamps: true
})

const foodSchema = new Schema ({
  name: {
    type: String,
    required: true},
  category: {
    type: String,
    required: true},
  vitamins: [{
    type: String,
    required: true}],
  reactions: [reactionSchema],
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const Food = mongoose.model('Food', foodSchema)

export {
  Food
}