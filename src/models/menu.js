import mongoose from 'mongoose';
const MenuSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});
export default mongoose.model('Menu', MenuSchema);