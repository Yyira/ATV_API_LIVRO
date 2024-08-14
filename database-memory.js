import { randomUUID } from "node:crypto"
export class DatabaseMemory {
#livros = new Map()
    
    list(titulo) {
        return Array.from(this.#livros.entries())
        .map((livroArray) =>{
            const id = livroArray[0]
            const data = livroArray [1]

            return {
                id,
                ...data, 
                }})

        .filter(livro =>{
            if (titulo) {
                return livro.titulo.includes(titulo)
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