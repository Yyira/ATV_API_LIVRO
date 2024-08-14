import { randomUUID } from "node:crypto"
export class DatabaseMemory {
#livros = new Map()
    
    list(titulo,ano,nota,autor,lido) {
        return Array.from(this.#livros.entries())
        .map((livroArray) =>{
            const id = livroArray[0]
            const data = livroArray [1]

            return {
                id,
                ...data, 
                }})

        .filter(livro =>{
            if (titulo && ano && nota && autor) {
                const titulo_low = livro.titulo.toLowerCase()
                const autor_low = livro.autor.toLowerCase()
                return (
                    titulo_low.includes(titulo.toLowerCase())&&
                    autor_low.includes(autor.toLowerCase())&&
                    livro.ano == ano &&
                    livro.nota == nota 
           
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