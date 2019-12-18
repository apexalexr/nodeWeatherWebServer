const path = require('path')
const express = require('express')
const hbs = require('hbs')
const darksky = require('./utils/darksky')
const geocode = require('./utils/geocode')

const app = express()

//Setup paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars enginge and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directories to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alex Yeung'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alex Yeung'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name:'Alex yeung'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        } else {
            darksky(latitude,longitude, (error,forecast) => {
                if(error) {
                    return res.send({
                        error:error
                    })
                } else {
                    return res.send({
                        forecast,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia'
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404 Help Article Not Found',
        name:'Alex Yeung'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: '404 Page not Found',
        name:'Alex Yeung'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})