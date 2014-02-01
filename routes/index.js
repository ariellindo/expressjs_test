
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.helloworld = function(req, res){
  res.render('helloworld', {title: 'helloworld'});
};

exports.userlist = function(db) {
  return function(req, res) {
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
    });
  };
};

exports.newuser = function(req, res){
  res.render('newuser', {title: 'add New User'});
};

exports.adduser = function(db){
  return function(req, res){
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var userCollection = db.get('usercollection');

    userCollection.insert({
      'username': userName,
      'email': userEmail
    }, function(err, doc){
      if (err){
        res.send("There was a problem adding the information to the database.");
      } else {
         res.location("userlist");
         res.redirect("userlist");
      }
    });
  }
};



