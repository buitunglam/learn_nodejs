const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { isEmail } = require('validator');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 character']
    }
}); 

// fire a function after user save to db
userSchema.post('save', function(doc, next){
    console.log('new user was created', doc);
    next();
})

// fire a function before user save to db
userSchema.pre('save', async function (next) {
    console.log('prev user created', this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


const User = mongoose.model('user', userSchema);

module.exports = User;