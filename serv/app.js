const Koa = require('koa')
const Send = require('koa-send');

const Static = require('koa-static')

const Logger = require('koa-logger')
const BodyParser = require('koa-bodyparser')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// if (process.env.NODE_ENV === 'production') {
//   //if app is in production, will serve index
//   app.use(Static(__dirname + '/../client/build'))
//   router.get('*', async(ctx, next) => {
//       try {
//           await Send(ctx, './client/build/index.html');
//       } catch (err) {
//           console.log(err)
//           next(err)
//       }
//   })
// }
app.use(Logger())

if (process.env.NODE_ENV === 'production') {
  //if app is in production, will serve index
  app.use(Static(__dirname + '/../client/build'))
  router.get('index', '/', async(ctx, next) => {
    try {
        console.log(ctx.path)
        await Send(ctx, './client/build/index.html');
    } catch (err) {
        console.log(err)
        next(err)
    }
  })
  // .get('/register', async(ctx, next) => {
    // console.log('hi')
    // await next()
    // console.log(ctx)
  // })
  .redirect('/*', 'index')
}


// app.use(Logger())

app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))



app.use(router.routes())
app.use(router.allowedMethods())



module.exports = app


//routes 
//initialize game 