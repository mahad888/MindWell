import mongoose from "mongoose";

const IdempotencyKeySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true }, // Unique idempotency key
    createdAt: { type: Date, default: Date.now, expires: 60 } // Auto-delete after 1 hour
});

const IdempotencyKey = mongoose.model('IdempotencyKey', IdempotencyKeySchema);

export default IdempotencyKey;
