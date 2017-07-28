Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/', function () {
  this.render('home');
});
Router.route('/things', function () {
  this.render('news');
});
Router.route('/tips', function () {
  this.render('projects');
});
