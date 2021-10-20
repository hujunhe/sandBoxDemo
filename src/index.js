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
    const data = JSON.parse(readFile() || {}).chooseItem
    ctx.body = {
        id: data,
        name: '花蝴蝶',
        address: '北京'
    }
})
router.get('/chooseItem', ctx => {
    const id = ctx.query.id
    writeFile(id)
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
function writeFile(id) {
    fs.writeFileSync(path.resolve(__dirname, './log.json'), JSON.stringify({ chooseItem: id }))
}