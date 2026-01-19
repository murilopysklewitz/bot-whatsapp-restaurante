import { Pool } from "pg";
import { Usuario } from "../../domain/Entity/Usuario";
import { IuserRepository } from "../../domain/gateway/userGateway";

export class UsuarioRepository implements IuserRepository {
    constructor(private readonly pool: Pool) {}

    async save(nome: string, telefone: string, endereco?: string): Promise<void> {
        if (!nome) {
            console.error("[SAVE USUARIO REPOSITORY] Nome é obrigatório");
            throw new Error("Nome é obrigatório");
        }
        
        if (!telefone) {
            console.error("[SAVE USUARIO REPOSITORY] Telefone é obrigatório");
            throw new Error("Telefone é obrigatório");
        }

        try {
            await this.pool.query(
                "INSERT INTO usuarios (nome, telefone, endereco) VALUES ($1, $2, $3)",
                [nome, telefone, endereco ?? null]
            );
            console.log(`Usuário salvo: ${telefone}`);
        } catch (error: any) {
            console.error("[SAVE USUARIO REPOSITORY] Erro ao salvar:", error.message);
            throw error;
        }
    }

    async findByPhoneNumber(telefone: string): Promise<Usuario | null> {
        if (!telefone) {
            console.error("[FIND BY PHONE NUMBER] Telefone é obrigatório");
            throw new Error("Telefone é obrigatório");
        }

        try {
            const result = await this.pool.query(
                "SELECT * FROM usuarios WHERE telefone = $1",
                [telefone]
            );

            if (result.rows.length === 0) {
                console.log(`ℹ️ Usuário não encontrado: ${telefone}`);
                return null;
            }

            const user = result.rows[0];
            
            console.log(`✅ Usuário encontrado: ${user.nome} (${user.telefone})`);

            return Usuario.restore(
                user.nome,
                user.telefone,
                user.endereco,
                user.estado,
                user.created_at, 
                user.updated_at 
            );

        } catch (error: any) {
            console.error("[FIND BY PHONE NUMBER] Erro:", error.message);
            throw error;
        }
    }
    async changeState(telefone: string, newState: string): Promise<string> {
        if(!newState){
            console.error("[CHANGE STATE PHONE NUMBER USER REPOSITORY] novo estado é obrigatório");
            throw new Error("novo estado é obrigatorio é obrigatório");
        }

        try{
            const query = await this.pool.query("UPDATE usuarios SET estado  = $1 WHERE telefone = $2", [newState, telefone])
            return newState
        }catch(error: any){
            console.error("[CHANGE STATE PHONE NUMBER USER REPOSITORY")
            throw error
        }
    }
}