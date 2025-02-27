// const express=require('express');
 const jwt=require('jsonwebtoken');


// exports.authenticateToken = (req, res, next) => {
    
//     const token = req.headers['authorization'];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ message: 'Invalid token' });
//         req.user = user;
//         next();
//     });
// };


exports.authenticateToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers['authorization']?.replace('Bearer ', '');
  
  if (!token) return res.status(401).json({ message: 'No token provided' });

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    // Attach user to request object
    req.user = user;
    next();
  });
};

  