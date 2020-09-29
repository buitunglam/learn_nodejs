const User = require('../models/User');
//handle errors
const handleErrors = (err) => {
    let errors = { email: null, password: null }
    if(err.message.includes('user validation failed')){
        console.log(Object.values(err.errors))
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    console.log(err)
    if(err.code === 11000){
        errors.email = 'Email is already registered'
    }
    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (err) {
        console.log('vao loi')
        let errors = handleErrors(err)
        res.status(400).json({errors});

    }

}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    res.send('login')
}
