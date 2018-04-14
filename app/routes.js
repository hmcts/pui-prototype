const express = require("express");
const router = express.Router();


// Models
const userEngine = require("./models/users");


// Route index page
router.get("/", function (req, res) {
  res.render("index", {
		users: userEngine.getUsersEntries()
	});
});


router.get("/dashboard/:id", function(req, res) {
 
	entry = userEngine.getUsersEntry(req.params.id);
	
	var cases = entry.cases.map(function(c) {

		var newCase = []; 
	
		Object.keys(c).forEach(function (key) {

			if(key === "number") {
				
					newCase.push({
						html: '<a href="/case/' + c.number + '">' + c.number + '</a>'
					});

				} else {

					newCase.push({ 
						text: c[key]
					});

				}
				
		});

		return newCase;

	});

  res.render("dashboard", {
		cases: cases,
		users: entry
	});
	
});


// Add your routes here - above the module.exports line
router.post("/v1/get-new-case", function (req, res) {
	req.session.success = true;
	res.redirect("/v1/case");
});


router.get("/v1/case", function (req, res) {
	res.render("v1/case/index", { success: req.session.success });
	req.session.success = null;
});


module.exports = router;