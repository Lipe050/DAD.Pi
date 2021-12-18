import express from "express"
import session from "express-session"
import bodyParser from "body-parser"
import { database } from "./database";

const port = 80
const app = express()

void async function () {
    const db = await database()

    app.use(bodyParser.json())

    app.use(session({
        secret: "ldkfjlsdjgflksajflsadfjsdfçshfwuf398y4",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    }))

    app.use('/pages', express.static('public'))

    app.post('/login',
        async function (request, response) {
            const responseData = await db.all("SELECT tipo FROM usuario WHERE email=:email AND senha=:senha LIMIT 1", {
                ":email": request.body.email,
                ":senha": request.body.senha
            })

            console.log({
                ":email": request.body.email,
                ":senha": request.body.senha
            })

            if (responseData.length == 0) {
                response.status(401); // Not Found
                response.json({ error: "Senha ou email incorreto" });
                return
            }

            const ses: any = request.session
            ses.user = responseData

            response.json(responseData)
        }
    )

    app.get("/cidades/:uf", async (req, res) => {
        const responseData = await db.all("SELECT idCIDADE, nome FROM cidade WHERE uf=:uf", { ":uf": req.params.uf })
        res.json(responseData)
    })

    app.post('/cadastrarorgao',
        async function (request, response) {
            const responseData = await db.all("INSERT INTO orgao (nome, cidade, uf) VALUES (:nome, :cidade, :uf)",
                {
                    ":nome": request.body.nome,
                    ":cidade": request.body.cidade,
                    ":uf": request.body.uf
                })

            console.log({
                ":nome": request.body.nome,
                ":cidade": request.body.cidade,
                ":uf": request.body.uf
            })

            if (responseData.length == 0) {
                response.status(401); // Not Found
                response.json({ error: "Erro ao cadastrar" });
                return
            }

            response.json(responseData)
        }
    )



    app.post('/cadastrarcidade',
        async function (request, response) {

            const ses: any = request.session
            if (!ses.user) {
                response.status(401); // Not Found
                response.json({ error: "Senha ou email incorreto" });
                return
            }


            const responseData = await db.run("INSERT INTO cidade (nome, uf) VALUES (:nome, :uf)",
                {
                    ":nome": request.body.nome,
                    ":uf": request.body.uf
                })

            console.log({
                ":nome": request.body.nome,
                ":uf": request.body.uf
            })

            response.json(responseData)
        }
    )

    app.post('/excluircidade',
        async function (request, response) {

            const ses: any = request.session
            if (!ses.user) {
                response.status(401); // Not Found
                response.json({ error: "Senha ou email incorreto" });
                return
            }


            const responseData = await db.run("DELETE FROM cidade (idCIDADE) WHERE idCIDADE=:idCIDADE",
                {
                    ":idCIDADE": request.body.idCIDADE
                })

            console.log({
                ":idCIDADE": request.body.idCIDADE
            })

            response.json(responseData)
        }
    )

    app.post('/tipodenuncia',
        async function (request, response) {
            const responseData = await db.all("INSERT INTO tipo_denuncia (descricao) VALUES (:descricao)",
                {
                    ":descricao": request.body.nome
                })

            console.log({
                ":descricao": request.body.nome
            })

            if (responseData.length == 0) {
                response.status(401); // Not Found
                response.json({ error: "Erro ao cadastrar" });
                return
            }

            response.json(responseData)
        }
    )

    app.post('/cadastraranimal',
        async function (request, response) {
            const responseData = await db.all("INSERT INTO animal (nome_cientifico, nome_popular, habitat, pot_veneno, procedencia) VALUES (:nome_cientifico, :nome_popular, :habitat, :pot_veneno, :procedencia)",
                {
                    ":nome_cientifico": request.body.nome_cientifico,
                    ":nome_popular": request.body.nome_popular,
                    ":habitat": request.body.habitat,
                    ":pot_veneno": request.body.pot_veneno,
                    ":procedencia": request.body.procedencia
                })

            console.log({
                ":nome_cientifico": request.body.nome_cientifico,
                ":nome_popular": request.body.nome_popular,
                ":habitat": request.body.habitat,
                ":pot_veneno": request.body.pot_veneno,
                ":procedencia": request.body.procedencia
            })

            if (responseData.length == 0) {
                response.status(401); // Not Found
                response.json({ error: "Erro ao cadastrar" });
                return
            }

            response.json(responseData)
        }
    )

    app.post('/cadastrarusuario',
        async function (request, response) {
            const responseData = await db.all("INSERT INTO usuario (nome, email, senha, telefone, data_nascimento, endereco, numero, bairro, cidade, estado) VALUES (:nome, :email, :senha, :telefone, :data_nascimento, :endereco, :numero, :bairro, :cidade, :estado)",
                {
                    ":nome": request.body.nome,
                    ":email": request.body.email,
                    ":senha": request.body.senha,
                    ":telefone": request.body.telefone,
                    ":data_nascimento": request.body.data_nascimento,
                    ":endereco": request.body.endereco,
                    ":numero": request.body.numero,
                    ":bairro": request.body.bairro,
                    ":cidade": request.body.cidade,
                    ":estado": request.body.estado
                })

            console.log({
                ":nome": request.body.nome,
                ":email": request.body.email,
                ":senha": request.body.senha,
                ":telefone": request.body.telefone,
                ":data_nascimento": request.body.data_nascimento,
                ":endereco": request.body.endereco,
                ":numero": request.body.numero,
                ":bairro": request.body.bairro,
                ":cidade": request.body.cidade,
                ":estado": request.body.estado
            })

            if (responseData.length == 0) {
                response.status(401); // Not Found
                response.json({ error: "Erro ao cadastrar" });
                return
            }

            response.json(responseData)
        }
    )

    app.listen(port, () => console.log(`⚡ servidor rodando na porta ${port}`))
}()