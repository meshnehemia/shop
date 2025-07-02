const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
firstname: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
      },
lastname: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
      },
username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true
},
email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
},
lastLogin: { 
    type: Date,
    default: Date.now 
    },
userType: {
    type: String,
    enum: ['regular', 'admin', 'superadmin'],
    default: 'regular'
},
createdAt: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model('User', UserSchema);
