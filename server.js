var express = require("express");
app = express();
var bodyparse = require("body-parse");
var mongoose = require("mongoose");
var cors = require("cors");

mongoose.connect("mongodb://localhost/stashsphere");

var user = mongoose.model("user", mongoose.Schema({
    _username: String,
    password: String,
    date_created: Date,
    fName: String,
    lName: String,
    path_root: String,
    associates: [{ type: String }],
    path_shared: String
}));

var node = mongoose.model("node", mongoose.Schema({
    file_name: String,
    uploader: String,
    date_up: Date,
    children: [{ type: Number }],
    starred: Boolean,
    deleted: Boolean,
    isFolder: Boolean
}));

app.use(cors());
app.use(bodyparse.json());

/*user actions*/


/*node actions*/
