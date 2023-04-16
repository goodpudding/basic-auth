const { Users } = require("../models");
const bcrypt = require('bcrypt');
const base64 = require('base-64');

async function handleSignIn (req, res){
  try {
    res.status(200).send('Log-in successful!');
} catch (e) {
    res.status(403).send('Unauthorized credentials');
}
};


module.exports = handleSignIn;
