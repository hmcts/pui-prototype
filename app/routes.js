var express = require('express');
var router  = express.Router();

router.use('/', require('./routes/mvp/manage-organisation'));
router.use('/', require('./routes/experimental'));
router.use('/', require('./views/oct-2020/routes'));

router.get('/', function (req, res) {
	res.render('index.html');
});

router.get('/sign-out', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

router.get('*/prototype-admin/view-data', function(req, res){

	querystring = '';
	for ( var key in req.session.data )
	querystring += key +'=' + req.session.data[key] + '&';

  res.render('prototype-admin/view-data', { data: JSON.stringify( req.session, null, 2), querystring: querystring } )
});


module.exports = router;