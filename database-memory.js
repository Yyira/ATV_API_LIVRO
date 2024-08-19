import { randomUUID } from "node:crypto"
export class DatabaseMemory {
    #livros = new Map()

    list(titulo, ano, nota, autor, lido) {
        return Array.from(this.#livros.entries())
            .map((livroArray) => {
                const id = livroArray[0]
                const data = livroArray[1]

                return {
                    id,
                    ...data,
                }
            })

            .filter(livro => {
                if (titulo || ano || nota || autor || lido) {
                    //autor
                    const autorDefined = autor != undefined
                    const autorLow = (autorDefined == true ? autor.toLowerCase() : false)


                    //lido
                    const lidoDefined = lido != undefined
                    let lidoBolean = true
                    if (lidoDefined) { lidoBolean = (lido == "true" ? true : false) }


                    //ano
                    const anoDefined = ano != undefined


                    //nota
                    const notaDefined = nota != undefined


                    //titulo
                    const tituloDefined = titulo != undefined
                    const tituloLow = (tituloDefined ? titulo.toLowerCase() : "")

                    console.log(titulo, livro.titulo)

                    return (
                        (autorDefined ? livro.autor.toLowerCase().includes(autorLow) : true) &&
                        (lidoDefined ? livro.lido == lidoBolean : true) &&
                        (anoDefined ? livro.ano == ano : true) &&
                        (notaDefined ? livro.nota == nota : true) &&
                        (tituloDefined ? livro.titulo.toLowerCase().includes(tituloLow) : true)

                    )



                }




                return true




            })
    }


    create(livro) {
        const livroId = randomUUID()

        this.#livros.set(livroId, livro)
    }

    update(id, livro) {
        this.#livros.set(id, livro)
    }

    delete(id) {
        this.#livros.delete(id)
    }


}