var userAPI = {
  getProfile: function(req, res) {
    var userId = req.user;
    // res.send(JSON.stringify(profile.get()));
    res.send(JSON.stringify(req.user));
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  }
};

module.exports = userAPI;
