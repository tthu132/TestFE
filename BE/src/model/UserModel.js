import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: String },
        address: { type: String },
        avatar: { type: String, default: '' },
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
export default User;