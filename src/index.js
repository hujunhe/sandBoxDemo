const Koa = require('koa')
const Router = require('koa2-router')
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')
const router = new Router({ allowedMethods: true })
const fs = require('fs')

const app = new Koa()
app.use(views(path.resolve(__dirname, './view/pages'), { extension: 'pug' }))
app.use(static(path.resolve(__dirname, './view')))

router.get('/', async ctx => {
    await ctx.render('touchScreen')
})
router.get('/show', async ctx => {
    await ctx.render('showScreen')
})
router.get('/getData', ctx => {
    const data = JSON.parse(readFile() || {})
    ctx.body = {
        id: data.chooseItem,
        name: data.name,
    }
})
router.get('/chooseItem', ctx => {
    const id = ctx.query.id
    const name = ctx.query.name
    writeFile(id, name)
    ctx.body = {
        code: 0
    }
})
app.use(router)
const port = 1000
app.listen(port)
console.log(`server start in port: ${port}`)

function readFile() {
    const data = fs.readFileSync(path.resolve(__dirname, './log.json'), { encoding: 'utf8' })
    return data
}
function writeFile(id, name) {
    fs.writeFileSync(path.resolve(__dirname, './log.json'), JSON.stringify({ chooseItem: id, name: name }))
}