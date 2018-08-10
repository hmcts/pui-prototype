var express = require('express');
var router  = express.Router();

router.get('/', function (req, res) {
	res.render('index.html');
});

router.get('/sign-out', function (req, res) {
	req.session.destroy();
	res.redirect('/app/sign-in');
});

router.post('/apply/sra-number', (req, res) => {
	if(req.body['sra-number-q'] === 'yes') {
		res.redirect('/apply/sra-number-2');
	} else {
		res.redirect('/apply/not-sure');
	}
});

router.post('/apply/sra-number-3', (req, res) => {
	req.session.data['org-name'] = 'Irwin Mitchell Solicitors';
	req.session.data['org-number'] = '123456';
	req.session.data['org-address'] = '40 Holborn Viaduct<br> London<br> EC1N 2PZ';
	res.redirect('/apply/name')
});

module.exports = router;