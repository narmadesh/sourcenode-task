const express = require('express');
const router = express.Router();
const config = require('../database/connection');
const connection = config.connection;
const jwt = require("jsonwebtoken");

router.post('/auth/login', function (req, res) {
    const email_id = req.body.email_id ?? "";
    const password = req.body.password ?? "";
    if (email_id == "") {
        res.status(409).json({ message: "Email id should not be empty" });
    }
    else if (password == "") {
        res.status(409).json({ message: "Password should not be empty" });
    }
    else {
        connection.query("SELECT * FROM `users` WHERE `email_id` = ? AND `password` = ?", [email_id, password], function (err, result) {
            if (err) throw err;
            const auth_token = jwt.sign(
                { email_id: email_id, password: password },`${email_id}${password}`,{expiresIn: "2h",}
            );
            connection.query('UPDATE `users` SET `auth_token` = ? WHERE `id` = ?', [auth_token,result[0].id]);
            result[0].auth_token = auth_token;
            res.status(200).json(result[0]);
        })
    }
});

module.exports = router;