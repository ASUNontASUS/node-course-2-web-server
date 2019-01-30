const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

hbs.registerPartials('C:/Users/ASUS/Desktop/Learnig-Node.js-Development/node-web-server/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}:${req.method}${req.url}`;
	fs.appendFile('server.log',log+'\n',(error)=>{
		if(error){
			console.log('Unable to add file.');
		}
	});
	console.log(log);
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static('C:/Users/ASUS/Desktop/Learnig-Node.js-Development/node-web-server/public'));


hbs.registerHelper('currentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{
	//res.send('Hello World !');
	res.render('home.hbs',{
		pageTitle : 'Home Page',
		welcomeMessage : 'Welcome to my webside!',
		//currentYear : new Date().getFullYear()
	});
});


app.get('/about',(req,res)=>{
	//res.send('<h1>Hello Express!</h1>');
	res.render('about.hbs',{
		pageTitle: 'About Page',
		//currentYear: new Date().getFullYear()
	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage: 'Unable to handle request'
	})
})
app.listen(3000,()=>{
	console.log("Server is up on port 3000");
});