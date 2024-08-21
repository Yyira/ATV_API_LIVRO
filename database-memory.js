import { randomUUID } from "node:crypto"
export class DatabaseMemory {
    #livros = new Map()




    list(titulo, ano, nota, autor, lido, anoInicial, anoFinal) {
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
                if (titulo || ano || nota || autor || lido || anoInicial || anoFinal) {
                    //autor
                    const autorDefined = autor != undefined
                    const autorLow = (autorDefined == true ? autor.toLowerCase() : false)


                    //lido
                    const lidoDefined = lido != undefined
                    let lidoBolean = true
                    if (lidoDefined) { lidoBolean = (lido == "true" ? true : false) }


                    //ano
                    const anoDefined = ano != undefined

                    //ano
                    const anoInicialDefined = anoInicial != undefined

                    //ano
                    const anoFinalDefined = anoFinal != undefined


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
                        (anoInicialDefined ? livro.ano >= anoInicial : true) &&
                        (anoFinalDefined ? livro.ano <= anoFinal : true) &&
                        (notaDefined ? livro.nota == nota : true) &&
                        (tituloDefined ? livro.titulo.toLowerCase().includes(tituloLow) : true)

                    )



                }




                return true




            })
    }


    create(livro) {
        const livroId = randomUUID()
        //ip fixo apenas para teste
        //const livroId = "1"
        this.#livros.set(livroId, livro)
    }

    update(id, livro, livroAntigo) {

        //console.log(livro.titulo, livroAntigo.titulo)

        livro.titulo = livro.titulo ?? livroAntigo.titulo
        livro.autor = livro.autor ?? livroAntigo.autor
        livro.ano = livro.ano ?? livroAntigo.ano
        livro.nota = livro.nota ?? livroAntigo.nota
        livro.lido = livro.lido ?? livroAntigo.lido

        this.#livros.set(id, livro)
    }
    find(livroId) {
        const livroAntigo = this.#livros.get(livroId)

        return livroAntigo
    }
    delete(id) {
        this.#livros.delete(id)
    }


}