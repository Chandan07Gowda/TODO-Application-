const express=require('express');
const User=require('../controller/user')
const router=express();


router.route('/user/register').post(User.register);

router.route('/user/login').post(User.login);

module.exports=router;