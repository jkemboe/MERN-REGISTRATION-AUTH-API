const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

//@route    GET api/auth
//@desc     Authenticate user and get token
//@access    Public

router.get('/', auth, async (req, res) => {
   try{
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
   }catch(e){
    console.error(e.message)
    res.status(500).send('Server error')
   }
})

//@route    POST api/auth
//@desc     Authenticate user and get token
//@access   Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],async (req, res) => {
    const erros = validationResult(req)

    if(!erros.isEmpty()){
        return res.status(400).json({erros: erros.array()})
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        
        if(!user) {
           return res.status(400).json({errors: [{msg:'Invalid credentials'}]})
        }
        
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({errors: [{msg:'Invalid credentials'}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 36000},
            (err, token) => {
                if(err) throw err;
                res.json({token})
            }
            )
    }
    catch(e){
        console.error(e.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;