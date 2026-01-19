import { Usuario } from "../Entity/Usuario";

export interface IuserRepository{
    save(nome: string, telefone: string, endereco?: string): Promise<void>
    findByPhoneNumber(telefone:string): Promise<Usuario|null>
    changeState(telefone: string, newState: string): Promise<string>
 
}