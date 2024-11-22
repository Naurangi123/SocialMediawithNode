const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { mainModule } = require('process');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String,
     required: true,
      unique: true
    },
  email:    { 
    type: String, 
    required: true, 
    unique: true },
  password: { 
    type: String, 
    minlength: 8,
    required: true 
  },
  confirmPassword: { 
    type: String, 
    minlength: 8,
    required: true,
    validate:{
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match.'
    } 
  },
  passwordChangedAt:Date,
  bio:      { 
    type: String, 
    default: '' 
  },
  photo: { 
    type: String, 
    default: '' 
  },
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password=await bcrypt.hash(this.password,12);
  this.confirmPassword = undefined; 
  next();
});

// Method to compare password
UserSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changePasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10); // Divide by 1000 to get seconds
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

module.exports = mongoose.model('User', UserSchema);
