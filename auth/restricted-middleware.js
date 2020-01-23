const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   const { authorization } = req.headers;
   const secret = process.env.JWT_SECRET || "Is is secret, is it safe?";

   if (!authorization) {
      return res.status(400).json({
         message: "You must login first!"
      });
   }

   jwt.verify(authorization, secret, (error, decodedToken) => {
      if (error) {
         return res.status(401).json({message: "Invalid Token"});
      }

      req.token = decodedToken;
      next();
   });
};
