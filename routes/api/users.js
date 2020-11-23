const express = require("express");
const router = express.Router();

router.get("/", function(req, res){
    res.json("json for users api");
});

module.exports = router;