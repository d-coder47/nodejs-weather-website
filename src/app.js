const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SETUP HANDLEBARS ENGINE FOR VIEWS AND LOCATION
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))


// MAIN PAGE
app.get('', (req, res) =>{
	res.render('index', {
		title: 'Weather App',
		name: 'Danilson G.Reis'
	})
})

// ABOUT PAGE
app.get('/about', (req, res) =>{
	res.render('about', {
		title: 'About Me',
		name: 'Danilson G.Reis'
	})
})

// HELP PAGE
app.get('/help', (req, res) =>{
	res.render('help', {
		title: 'Help',
		name: 'Danilson G.Reis',
		msg: 'This is where we\'ll answer your questions.'
	})
})

// WEATHER PAGE
app.get('/weather', (req, res) =>{
	if(!req.query.address){
		return res.send({
			error: 'You must provide an address!'
		})
	}

	geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
				if(error){
					return res.send({error})
				}

				forecast(latitude, longitude, (error, forecastData) => {
					if(error){
						return res.send({error})
					}

					res.send({
						forecast: forecastData,
						location,
						address: req.query.address
					})
				})

			})
	
})

app.get('/prod', (req, res) =>{
	if(!req.query.search){
		return res.send('You must provide a search term.')
	}

	console.log(req.query)
	res.send({
	products: []
	})
	

	
})

// 404 PAGE 4 HELP/
app.get('/help/*', (req, res) =>{
	res.render('error',
		{
			error_msg: 'Help article not found.',
			name: 'Danilson G.Reis',
			title: '404'
		})
})

// 404 PAGE
app.get('*', (req,res) =>{
	res.render('error',
	{
		error_msg: 'Page not found.',
		name: 'Danilson G.Reis',
		title: '404'
	})
})

app.listen(3000, () =>{
	console.log('Server is up on port 3000.')
})