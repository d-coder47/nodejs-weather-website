const request = require('request')


const forecast = (long, lat, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=38e488d39655031784080d730c173cc9&query='
	+lat+','+long+'&units=m'
	request({url, json:true}, (error,{body} = {}) =>{
		if(error){
			callback('Unable to connect to weather services!', undefined)

		} else if(body.error){
			callback('Unable to find location!', undefined)
			
		} else{
			callback(undefined, body.current.weather_descriptions[0] + 
			'.It is currently ' + body.current.temperature + 
			' degrees out. It feels like ' + body.current.feelslike + 
			' degrees out. There is ' + body.current.precip +'% chances of raining!')
			
		}
	})
}

module.exports = forecast
