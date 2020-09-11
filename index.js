const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const emailServer = require('./models/emailServer')

//Engine View
app.engine('handlebars', handlebars({defaultLayout: 'main'}) )

//Sets
app.set('view engine', 'handlebars')

//Uses
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))

//Rota principal
app.get('/', (req, res) => { res.render('home', {layout: null}) })
app.get('/simposio/2021', (req, res) => { res.render('en-us/sobre', {layout: 'main', sobre: true}) })
app.get('/simposio/2021/topicos-de-interesse', (req, res) => { res.render('en-us/topicos-de-interesse', {layout: null, topicos: true}) })
app.get('/simposio/2021/sobre', (req, res) => { res.render('en-us/sobre', {layout: 'main', sobre: true}) })
app.get('/simposio/2021/datas', (req, res) => { res.render('en-us/datas', {layout: null, datas: true}) })
app.get('/simposio/2021/contato', (req, res) => { res.render('en-us/contato', {layout: null, contato: true}) })
app.get('/simposio/2021/programacao', (req, res) => { res.render('en-us/programacao', {layout: null, prog: true}) })
app.get('/simposio/2021/trabalhos', (req, res) => { res.render('en-us/trabalhos', {layout: null, trabalhos: true}) })
app.get('/simposio/2021/inscricoes', (req, res) => { res.render('en-us/inscricoes', {layout: null, inscricoes: true}) })
app.get('/simposio/2021/equipe', (req, res) => { res.render('en-us/equipe', {layout: null, equipe: true}) })

app.post('/simposio/2021/contato/email', async (req, res) => { 
    await emailServer.enviarEmail(req.body.email1, req.body.assunto1, req.body.mensagem1)
    res.redirect('/simposio/2021/contato')
})


//Worker do servidor
var porta = process.env.PORT || 3000
app.listen(porta, () => {
    console.log('App rodando na porta: ' + porta)
})