const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Oren Zfira'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Oren Zfira'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help page',
        helpMsg: 'Here to help',
        name: 'Oren Zfira'
    })
    
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error:'You must provide an address!'
        })
    }

    geocode(address, (error, { location, longtitude, latitude } = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(longtitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: 'Error: ' + error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address      
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Oren Zfira',
        errMsg: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Oren Zfira',
        errMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})