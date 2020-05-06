const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=033c87bcf82ef0082a653cc1c158b98c&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Could not find coordinates. Please try other coordinates')
        } else {
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            const humidity = body.current.humidity

            callback(undefined, `${description}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out. The humidity is ${humidity}%`)
        }
    })
}

module.exports = forecast