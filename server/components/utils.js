exports.authenticate = function(req, res, next){
  if (!req.isAuthenticated()) res.send(401);
  else next();
};
