import { Pool } from "pg";

export class UsuarioRepository {
    constructor(private readonly pool: Pool){

    }
    async save(nome: string, numero: string, endereco?: string): Promise<void>{
        if(!nome){
            console.error("[SAVE USUARIO REPOSITORY] Não se pode salvar usuário com nome nulo");
            throw new Error("Nome é obrigatório");
            return;
        }
        if(!numero){
            console.error("[SAVE USUARIO REPOSITORY] Não se pode salvar usuário com numero nulo");
            throw new Error("[SAVE USUARIO REPOSITORY] Número é obrigatório");
            return;
        }
        try{
            const query = await this.pool.query("INSERT INTO usuarios (nome, numero, endereco) VALUES ($1, $2, $3)", [nome, numero, endereco ?? null]);

        }catch(error: any){
            console.log("[SAVE USUARIO REPOSITORY] Não foi possível salvar usuario no banco de dados", error.message);
            throw error;
        }
    }
}