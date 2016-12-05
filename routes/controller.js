var express = require("express");
var router = express.Router();

/* player controller */
router.get("/", function(req, res, next){
    res.render("controller", { title:"コントローラ"});
});

module.exports = router;