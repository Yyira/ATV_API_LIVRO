import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify()

const database = new DatabaseMemory

//metodo get

server.get("/livro", (Request) => {
    const {titulo,ano,nota,autor,lido,anoInicial,anoFinal} = Request.query

    const livro = database.list(titulo, ano, nota, autor, lido, anoInicial, anoFinal)

    return livro
})




//metodo post

server.post("/livro", (Request, replay) => {
    const { titulo, autor, ano, lido, nota } = Request.body
    console.log(titulo, autor, ano, lido, nota)


    let erros = new Array

    if (titulo == undefined) { (erros.push("Titulo invalido ")) }
    if (autor == undefined) { (erros.push("Autor invalido ")) }
    if (ano == undefined) { (erros.push(" Ano invalido ")) }
    if (lido == undefined) { (erros.push(" Lido invalido ")) }


    if ((titulo != undefined) && (autor != undefined) && (ano != undefined) && (lido != undefined)) {
        database.create({
            titulo,
            autor,
            ano,
            lido,
            nota
        })



        return replay.status(201).send()
    }

    else {

        return replay.status(422).send(
            erros
        )
    }



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