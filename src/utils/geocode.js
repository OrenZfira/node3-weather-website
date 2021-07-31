const request = require('postman-request')

const geocode = (address, callback) => {//encodeURIComponent for special notes
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3JlbnpmIiwiYSI6ImNrZ2wzeWM5cTAyZDczYXFubmJkMW5jNm4ifQ.fwK2XwXb_dO3obRJYTS6jA&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        const {features} = body
        if(error){
            callback('Unable to connect to location services')
        } else if(features.length === 0) {
            callback('Unable to find location. Try another search.')
        }
        else{
            callback(undefined, {
                longtitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })

}

module.exports = geocode