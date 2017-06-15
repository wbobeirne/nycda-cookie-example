const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

function renderForm(req, res) {
	res.render("form", {
		document: req.docText,
	});
}

function docTextMW(req, res, next) {
	if (req.body.text) {
		req.docText = req.body.text;
		res.cookie("document", req.docText);
	}
	else {
		req.docText = req.cookies.document;
	}

	next();
}

app.get("/", docTextMW, function(req, res) {
	renderForm(req, res);
});

app.post("/", docTextMW, function(req, res) {
	renderForm(req, res);
});

app.listen(3000, function() {
	console.log("Available at http://localhost:3000");
});
