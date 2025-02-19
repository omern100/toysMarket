require('dotenv').config();
exports.config ={
    tokenSecret:process.env.JWT_SECRET,
    userDB:process.env.USERDB,
    passDB:process.env.PASSDB
}