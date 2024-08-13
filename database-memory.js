import { randomUUID } from "node:crypto"

export class DatabaseMemory {
#livros = new Map()
    
    list() {
        return Array.from(this.#livros.entries()).map((livroArray) =>{
            const id = livroArray[0]
            const data = livroArray [1]

            return {
                id,
                ...data, 
                }})
            }
}