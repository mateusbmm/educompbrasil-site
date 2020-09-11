const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const emailServer = require('./models/emailServer')
const emailSendGrid = require('./models/emailSendGrid')
const emailGmail = require('./models/emailGmail')
const session = require('express-session')


var Recaptcha = require('express-recaptcha').RecaptchaV2;
var recaptcha = new Recaptcha('6LeNA8AZAAAAAJmY-6NdzECm6ZmT1l7HyGDSbIXP', '6LeNA8AZAAAAADLN57e16kUPNaNmKWPPzRaAPE-N');

const fetch = require('node-fetch')
const { stringify } = require('querystring');
const e = require('express')
const { response } = require('express')

//Engine View
app.engine('handlebars', handlebars({defaultLayout: 'main'}) )

//Sets
app.set('view engine', 'handlebars')

//Uses 
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))
// app.use(session({
//   secret: 'secret-key',
//   resave: false,
//   saveUninitialized: false,
// }))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//GIEC
app.get('/', (req, res) => { res.render('giec/index', {layout: 'giec/layout'}) })

//EduComp 2021
app.get('/simposio/2021', (req, res) => { res.render('en-us/sobre', {layout: 'simposio/2021/layout', sobre: true}) })
app.get('/simposio/2021/topicos-de-interesse', (req, res) => { res.render('en-us/topicos-de-interesse', {layout: 'simposio/2021/layout', topicos: true}) })
app.get('/simposio/2021/sobre', (req, res) => { res.render('en-us/sobre', {layout: 'simposio/2021/layout', sobre: true}) })
app.get('/simposio/2021/datas', (req, res) => { res.render('en-us/datas', {layout: 'simposio/2021/layout', datas: true}) })
app.get('/simposio/2021/programacao', (req, res) => { res.render('en-us/programacao', {layout: null, prog: true}) })
app.get('/simposio/2021/wlic', (req, res) => { res.render('en-us/wlic', {layout: null, wlic: true}) })
app.get('/simposio/2021/trabalhos', (req, res) => { res.render('en-us/trabalhos', {layout: null, trabalhos: true}) })
app.get('/simposio/2021/inscricoes', (req, res) => { res.render('en-us/inscricoes', {layout: null, inscricoes: true}) })
app.get('/simposio/2021/equipe', (req, res) => { res.render('en-us/equipe', {layout: null, equipe: true}) })
app.get('/simposio/2021/contato', recaptcha.middleware.renderWith({'hl':'fr'}), function(req, res){
    res.render('contato', { layout: null, contato: true, captcha:res.recaptcha });
}) 
app.post('/email2', recaptcha.middleware.verify, async function(req, res){
  if (!req.recaptcha.error) {
      console.log(req.body)
      await emailServer.enviarEmail(req.body.email1, req.body.assunto1, req.body.mensagem1)
      req.session.retorno = 'Email enviado com sucesso!'
      res.redirect('/simposio/2021/contato')
  } else {
      res.redirect('/simposio/2021/contato')
  }
})


//Worker do servidor
var porta = process.env.PORT || 3000
app.listen(porta, () => {
    console.log('App rodando na porta: ' + porta)
})