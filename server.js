var express = require("express");
app = express();
var bodyparse = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var fs = require("fs");
var multer = require("multer");

//var upload = multer({ storage: multer.memoryStorage() });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./temp/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

/*
A helper function for removing folders, needed a recursive way to remove any and all subdirectories/files when removing a user
*/
var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

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
    children: [{ type: String }],
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
    User.findOne(
        { _username: req.body._username },
        function (err, to_del) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            deleteFolderRecursive(to_del.path_root);
            deleteFolderRecursive(to_del.path_shared);
        });
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

/*
uploading a file, some information must be provided along with the file itself.
formatting:
{
    u_path:<path (from user's root) that ends with the target folder>,
    owner:<the _username of the uploader>,
    file:<the file to store>
}
*/
app.post("/node/file_up", upload.single("file"), function (req, res) {
    console.log("headers: " + req.headers);
    console.log("content-type: " + req.headers["content-type"]);
    console.log("file: " + req.file);
    //console.log("The request body: " + req.body);
    console.log("path: " + req.body.u_path);
    console.log("owner: " + req.body.owner);
    User.findOne({ _username: req.body.owner }, function (err, user) {
        if (err) { res.send(err) }
        if (user) {
            var from = "./temp/" + req.file.originalname;
            var to = user.path_root + "/" + req.body.u_path + "/" + req.file.originalname;
            fs.copyFileSync(from, to);
            if (fs.existsSync(to)) {
                //the file exists in the new directory, clean up temp
                fs.unlinkSync(from);
                //add a reference to the new file in the database
                Node.create({
                    file_name: to,
                    uploader: req.body.owner,
                    date_up: Date.now(),
                    children: [],
                    starred: false,
                    deleted: false,
                    isFolder: false
                });
                res.json({ "created": true, "location": to });
            } else {
                res.json({
                    "created": false,
                    "message": "File does not exist in desired directory."
                });
            }
        }
    });
});

/*
creating a folder. Provide the _username, "current path" and the name of the folder to be created.
formatting:
{
    "_username":<_username>,
    "cur_path":<user's current path (from their root folder)>,
    "name":<the name of the folder to be created
}
*/
app.post("/node/new_folder", function (req, res) {
    console.log("received request to create a folder:\n" + req.body.name + "\nin the existing folder:\n" + req.body.cur_path + "\nfor user: " + req.body._username);
    User.findOne({ _username: req.body._username }, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            var dest = user.path_root + "/" + req.body.cur_path + req.body.name;
            fs.mkdirSync(dest);
            if (fs.existsSync(dest)) {
                var f_doc = new Node();
                f_doc.file_name = dest;
                f_doc.uploader = req.body._username;
                f_doc.date_up = Date.now();
                f_doc.children = [];
                f_doc.starred = false;
                f_doc.deleted = false;
                f_doc.isFolder = true;
                f_doc.save(function (err, doc) {
                    Node.findOneAndUpdate(
                        { file_name: user.path_root + "/" + req.body.cur_path.slice(0, -1) },
                        { $addToSet: { children: doc._id } },
                        function (err) { if (err) { res.send(err); } }
                    );
                    res.json(
                        {
                            "created": true,
                            "location": dest
                        });
                });
            } else {
                res.json({
                    "created": false,
                    "message": "after trying to create the directory, it did not exist in the desired path"
                }); //end bad response
            } //end if-else-if: fs.existsSync()
        } //end if-else-if err
    }); //end findone
});

/*
removing a file
*/
app.delete("/node/rm", function (req, res) {
    //
});

/*
removing a folder
*/
app.delete("/node/rmdir", function (req, res) {
    //
});

/*
updating a file
*/
app.put("/node/update", function (req, res) {
    //
});

/*
starring a file
*/
app.put("/node/star", function (req, res) {
    //
});

/*
getting a file
*/
app.get("/node/file", function (req, res) {
    //
});

/*
getting a folder
*/
app.get("/node/folder", function (req, res) {
    //
});

/*start the server*/
app.listen(3000, "localhost", function () {
    console.log("Listening on port 3000");
});