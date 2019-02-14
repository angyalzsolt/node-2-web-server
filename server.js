const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to appen to server log.');
		}
	})
	next();
});

app.use((req, res, next)=>{
	res.render('maintence.hbs');
})

app.use(express.static(__dirname + '/public'));


app.get('/maintance', (req, res) => {
	res.render
})


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})



app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		currentYear:  new Date().getFullYear(),
		welcomeMessage: 'welcome to the page'
	})
});

app.get('/about', (req, res)=>{
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
})


app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});



app.listen(3000, () => {
	console.log('Server is up on port 3000');
});