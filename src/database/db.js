// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que ira operar no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o objeto de banco de daos, para nossas operações
db.serialize(() => {
//     // Com comandos SQL irei:

//     // Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             adress TEXT,
//             adress2 TEXT,
//             state TEXT,
//             city, TEXT,
//             items TEXT
//         );
//     `)

//     // Inserir dados na  tabela
//     const query = `
//         INSERT INTO places (
//             name,
//             image,
//             adress,
//             adress2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);-
//     `
//     const values = [
//         "Colectoria",
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
//         "Guilherme Gemballa, Jardim América",
//         "260",
//         "Rio Grande do Sul",
//         "Santa Catarina",
//         "Resíduos Eltrônicos, Lâmpadas"
//     ]

//     function afterInsertData (err) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     // db.run(query, values, afterInsertData)

//     // Consultar os dados da tabela

    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros")
    //     console.log(rows)
    // })

    // Deletar um dado da tabela

    
    db.run(`DELETE FROM places WHERE id = ?`, 13, function(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso.")
    })
})