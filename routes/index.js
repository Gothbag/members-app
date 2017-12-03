var express = require("express");
var router = express.Router();
var mongo = require("../database");

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { title: "Members" });
});

router.post("/api/members", function(req, res) {
	mongo.db()
		.collection("members")
		.find()
		.toArray(function (err, docs) {
			if (err) {throw err;}
			res.json(docs);
		});
});

router.post("/api/add", function(req, res) {
	var member = req.body;
	mongo.db()
		.collection("members")
		.insert(member, function (err) {
			if (err) {throw err;}
		});
});

router.put("/api/members/:id", function(req, res) {
	var id = new mongo.ObjectId(req.params.id);
	var member = req.body;
    delete( member._id );
	mongo.db()
		.collection("members")
		.update({_id: id}, member, function (err) {
			if (err) {throw err;}
		});
});

router.delete("/api/members/:id", function(req, res) {
	var id = new mongo.ObjectId(req.params.id);
	mongo.db()
		.collection("members")
		.remove({_id: id}, function (err) {
		  if (err) {throw err;}
	});
});

module.exports = router;
