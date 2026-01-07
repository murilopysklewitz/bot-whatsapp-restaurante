import { Pool } from "pg";
import { Usuario } from "../../domain/Entity/Usuario";
import { IuserRepository } from "../../domain/gateway/userGateway";

export class UsuarioRepository implements IuserRepository {
    constructor(private readonly pool: Pool){

    }
    async save(nome: string, numero: string, endereco?: string): Promise<void>{
        if(!nome){
            console.error("[SAVE USUARIO REPOSITORY] Não se pode salvar usuário com nome nulo");
            throw new Error("Nome é obrigatório");
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

    async findByPhoneNumber(phoneNumber: string): Promise<Usuario>{
        if(!phoneNumber) {
            console.error("[FIND BY PHONE NUMBER USUARIO REPOSITORY] Não se pode buscar usuário com telefone nulo");
            throw new Error("Nome é obrigatório");
        }

        try{
            const userDb = await this.pool.query("SELECT * FROM usuarios WHERE telefone = $1", [phoneNumber]);
            return userDb.rows[0]
        }catch (error) {
            console.error("[FIND BY PHONE NUMBER USUARIO REPOSITORY] Erro ao buscar usuário:", error);
            throw error;
          }
    }
}