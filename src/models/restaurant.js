import mongoose from 'mongoose';
const RestaurantSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  opening_hours: {
    type: Number,
    required: true
  }
});
export default mongoose.model('Restaurant', RestaurantSchema);