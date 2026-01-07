import { Usuario } from "../Entity/Usuario";

export interface IuserRepository{
    save(nome: string, numero: string, endereco?: string): Promise<void>
    findByPhoneNumber(phoneNumber:string): Promise<Usuario>
 
}