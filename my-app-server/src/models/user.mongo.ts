import mongoose from 'mongoose';

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        default: []
    }
});

export default mongoose.model('User', userSchema);