import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, default: 'Bangladesh' }
  },
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    duration: String, // e.g. "Lifetime"
    type: String      // e.g. "Subscription"
  }],
  totalAmount: { type: Number, required: true },
  payment: {
    method: { type: String, enum: ['bKash', 'Nagad', 'Rocket', 'Binance', 'Bybit', 'Crypto'], required: true },
    senderNumber: { type: String }, // For mobile banking
    transactionId: { type: String, required: true }
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Prevent model overwrite in development
export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
