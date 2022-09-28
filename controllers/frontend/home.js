// controllers/frontend/home.js

const postdb = require("../../models/post")


class Home{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Home"
        setup.route = "/"

        const { posts, length } = await postdb.getPosts(req, setup.fpostLimit)
        setup.items = posts
        setup.count = length
        setup.page = 1

        res.render("base", { data: setup })
    }

    async paginate(req, res){
        const setup = await req.mysetup()
        const { posts, length } = await postdb.paginate(req, setup.fpostLimit)
        setup.count = length
        setup.items = posts
        setup.page = parseInt(req.body.page) + 1
        res.json(setup)
    }
}


module.exports = new Home()