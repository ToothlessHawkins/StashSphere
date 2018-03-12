var express = require("express");
app = express();
var bodyparse = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var fs = require("fs");

mongoose.connect("mongodb://localhost/stashsphere");

var User = mongoose.model("User", mongoose.Schema({
    _username: String,
    password: String,
    date_created: Date,
    fName: String,
    lName: String,
    path_root: String,
    associates: [{ type: String }],
    path_shared: String
}));

var Node = mongoose.model("Node", mongoose.Schema({
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

/*
to attempt a login, make a post request with:
    {
        _username:<uname>, 
        password:<pass>
    }
as the body of the request.
*/
app.post("/user/login", function (req, res) {
    User.findOne(
        {
            _username: req.body._username,
            password: req.body.password
        }, function (err, user) {
            if (err) {
                res.send(err);
            }
            if (user) {
                res.json({
                    _username: user._username,
                    date_created: user.date_created,
                    fName: user.fName,
                    lName: user.lName,
                    associates: user.associates,
                    path_root: user.path_root,
                    path_shared: user.path_shared
                });
            } else {
                res.send(false);
            }
        });
});

/*
pass a json formatted user in the body of the request.
Formatting:
{
    _username:<username>,
    password: <pass>,
    fName: <first name>,
    lName: <last name>,
}
*/
app.post("/user/create", function (req, res) {
    User.findOne(
        {
            _username: req.body._username
        }).then(function (user) {
            if (user) {
                console.log("inside if(user)");
                res.json(
                    {
                        "success": false,
                        "message": "Invalid username."
                    });
            } else {
                new_user = {
                    _username: req.body._username,
                    password: req.body.password,
                    fName: req.body.fName,
                    lName: req.body.lName
                };
                new_user.date_created = Date.now();
                //create user's root folder
                var dir = __dirname + "/roots/" + new_user._username + "_home";
                console.log("creating home directory: " + dir);
                try {
                    fs.mkdirSync(dir);
                } catch (err) {
                    console.log(
                        "failed to create: " + dir + "\n");
                    res.send(false);
                    return;
                }
                if (fs.existsSync(dir)) {
                    console.log("successfully created: " + dir + "\n");
                    new_user.path_root = dir;
                }
                //create user's shared folder
                var shared_dir = __dirname + "/shared/" + new_user._username;
                console.log("creating directory: " + shared_dir + "\n");
                try {
                    fs.mkdirSync(shared_dir);
                } catch (err) {
                    console.log("failed to create: " + shared_dir + "\n");
                    res.send(false);
                    return;
                }
                if (fs.existsSync(shared_dir)) {
                    console.log("successfully created: " + shared_dir + "\n");
                    new_user.path_shared = shared_dir;
                }
                new_user.associates = [];
                User.create(new_user, function (err, created_user) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(created_user);
                });
            }
        });
});

/*
in order to delete a user, pass the unique username and password in the body of the request. The username is for identification purposes, the password is for verification.
formatting:
{
    "_username":<name>, 
    "password":<password>
}
*/
app.delete("/user/delete", function (req, res) {
    User.findOneAndRemove(
        { _username: req.body._username, password: req.body.password },
        function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ "_username": req.body._username, "removed": true });
        });
});

/*
updating a user's info. Pass the entire Json user in the body of the post request, provide password so the user verifies any change to their personal data. Exclude date_created, file paths, and associates list.
formatting:
{
    _username:<uname>,
    password:<pass>,
    fName:<first name>,
    lName:<last name>
}
*/
app.put("/user/update", function (req, res) {
    mod_user = {
        _username: req.body._username,
        password: req.body.password,
        fName: req.body.fName,
        lName: req.body.lName,
    };
    User.findOneAndUpdate(
        { _username: mod_user._username },
        mod_user,
        function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
});

/*
adding an associate is an update action, in the body of the request, provide the _username of the person to receive a new friend, and the _username of the person to become a new friend. The update will be reflexive.
formatting:
{
    add_to:<_username of friend recipient>,
    add:<_username of friend to add>
}

returns the "add_to" users's list of associates.
*/
app.put("/user/add_friend", function (req, res) {
    User.findOneAndUpdate(
        { _username: req.body.add_to },
        { $addToSet: { associates: req.body.add } },
        function (err) {
            if (err) {
                res.send(err);
            }
            User.findOneAndUpdate(
                { _username: req.body.add },
                { $addToSet: { associates: req.body.add_to } },
                function (err) {
                    if (err) {
                        res.send(err);
                    }
                }
            );
        }
    );
    User.findOne({ _username: req.body.add_to }, function (err, resu) {
        res.json(resu.associates);
    });
});

/*node actions*/



/*start the server*/
app.listen(3000, "localhost", function () {
    console.log("Listening on port 3000");
});