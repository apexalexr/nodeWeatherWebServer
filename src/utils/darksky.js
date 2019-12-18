const request = require('request')
const dSkySecretKey = '9342d2e26b7a0a891905fe81a443cf99'


const darksky = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/'+dSkySecretKey+'/'+lat+','+long+'?units=si&lang=en'
    request({url, json: true}, (error, {body})=> {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else { 
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            const summary = body.currently.summary
            // console.log(response.body.daily.data[0].summary)
            // console.log(response.body.daily.data[1].summary)
            callback(undefined, {
                forecast: 'It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain.',
                summary
            })
        }
    })
}

module.exports = darksky