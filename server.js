import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify()

const database = new DatabaseMemory
 
//metodo get

server.get("/livro", () => {
    const livro = database.list()
    console.log()
    return livro
})


server.listen({port:3333})

//metodo post

server.post("/livro", (Request, replay) => {
    const { titulo, autor, ano, lido, nota} = Request.body
      database.create({
        titulo,
        autor,
        ano,
        lido,
        nota
      }) 
      return replay.status(201).send()
      
      
})