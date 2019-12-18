
const request = require('request')
const mapBoxSecretKey = 'access_token=pk.eyJ1IjoiYXBleGFsZXhyIiwiYSI6ImNrNDh5dGttdjFhenIzZW8xbXByd3Zuc24ifQ.MdyVhBgXmKM0tTIbCnSLow'
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?'+mapBoxSecretKey+'&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to Geocoding service!',undefined)
        } else if(body.features.length === 0) {
            callback('No Search Results. Try another search.',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode