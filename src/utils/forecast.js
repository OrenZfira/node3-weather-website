const request = require('postman-request')

const forecast = (longtitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f5f26414dc502f0569bb8b777bc89166&query=' + latitude + ',' + longtitude + '&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to weather services!')
        } else if(body.error) {
            callback('Unable to find location')
        } else {
            const { current } = body
            callback(undefined, current.weather_descriptions[0] + '. It is currently ' + current.temperature + ' degress out. It feels like ' + current.feelslike + ' degress out. The humidity is: ' + current.humidity)
        }
    })

}

module.exports = forecast