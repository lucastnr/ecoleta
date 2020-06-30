const express = require("express")
const server = express()

const db = require("./database/db") //Pegando o banco de dados

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

// template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})


// configurar caminhos para a minha aplição

//Página inicial
server.get("/", (req, res) => {
   return res.render("index.html")
})

// Cadastro de ponto de coleta
server.get("/create-point", (req, res) => {
    // console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // req.body: O corpo do nosso formulário
    console.log(req.body)

    // Inserir dados na  tabela
    const query = `
        INSERT INTO places (
            name,
            image,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.name,
        req.body.image,
        req.body.adress,
        req.body.number,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData (err) {
        if(err) {
            return res.render("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

})

// Página de busca
server.get("/search", (req, res) => {
    // Seleciona todos os dados

    const search = req.query.city

    if (search == "") {
        return res.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        
        const total = rows.length

        // Página html com os dados do database
        return res.render("search-results.html", { places: rows, total })
    })
})

// Todos os pontos

server.get("/all-points", (req, res) => {
    // Seleciona todos os dados

    const search = req.query.city

    if (search == "") {
        return res.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        
        const total = rows.length

        // Página html com os dados do database
        return res.render("search-results.html", { places: rows, total })
    })
})

// ligar o servidor
server.listen(3000)