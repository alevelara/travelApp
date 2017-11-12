module.exports = function(app) {

// HOME
app.get('/', function(req, res) {
  res.render('index');
  });
}