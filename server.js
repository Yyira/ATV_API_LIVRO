import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify()

const database = new DatabaseMemory

//metodo get

server.get("/livro", (Request) => {
    const titulo = Request.query.titulo
    const ano = Request.query.ano
    const nota = Request.query.nota
    const autor = Request.query.autor
    const lido = Request.query.lido
    
    const livro = database.list(titulo, ano, nota, autor, lido)

    return livro
})




//metodo post

server.post("/livro", (Request, replay) => {
    const { titulo, autor, ano, lido, nota } = Request.body
    database.create({
        titulo,
        autor,
        ano,
        lido,
        nota
    })
    return replay.status(201).send()


})

//metodo put

server.put("/livro/:id", (Request, replay) => {
    const livroId = Request.params.id
    const { titulo, autor, ano, lido, nota } = Request.body
    database.update(
        livroId, {
        titulo,
        autor,
        ano,
        lido,
        nota
    }
    )
    return replay.status(204).send()

})


//metodo delete

server.delete("/livro/:id", (Request, replay) => {
    const livroId = Request.params.id

    database.delete(livroId)

    return replay.status(204).send()

})


server.listen({ port: 3333 })