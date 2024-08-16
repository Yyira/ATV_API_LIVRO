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
                //                if (titulo && ano && nota && autor && lido) {
                //                    const titulo_low = livro.titulo.toLowerCase()
                //                    const autor_low = livro.autor.toLowerCase()
                //                    const lidobolean = lido.toLowerCase() === true
                //                    console.log(lidobolean)
                //                    return (
                //                        titulo_low.includes(titulo.toLowerCase()) &&
                //                        autor_low.includes(autor.toLowerCase()) &&
                //                        livro.ano == ano &&
                //                        livro.nota == nota &&
                //                        livro.lido == lidobolean
                //                    )
                //                }
                if (titulo || ano || nota || autor || lido) {

                    //autor
                    const autorDefined = (autor == undefined ? false : true)
                    const autorLow = (autorDefined == true ? autor.toLowerCase() : false)

                    //lido
                    const lidoDefined = (lido == undefined ? false : true)
                    let lidoBolean = true
                    if (lidoDefined == true) { lidoBolean = (lido.toLowerCase().includes("true") ? true : false) }
                


                    return (
                        autorDefined ? livro.autor.toLowerCase().includes(autorLow) &&
                            lidoDefined ? livro.lido == lidoBolean 
                            : true
                            
                        : true &&
                        lidoDefined ? livro.lido == lidoBolean : true


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