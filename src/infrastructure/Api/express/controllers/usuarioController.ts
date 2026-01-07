import { Request, Response } from "express"
import { IuserRepository } from "../../../../domain/gateway/userGateway";
import { Usuario } from "../../../../domain/Entity/Usuario";

export class UsuarioController{
    constructor(private readonly userRepository: IuserRepository) {
        
    }
    async save(req:Request, res: Response) {
        try{
        const {nome, numero, endereco} = req.body;
        await this.userRepository.save(nome, numero, endereco);
        res.status(201)
        }catch(error: any){
            console.log("[SAVE USUARIO CONTROLLER] erro ao salvar usuario")

            return res.status(500).json({
                sucesso: false,
                erro: "[SAVE USUARIO CONTROLLER] Erro ao criar usuário"
              });
        }
    }
    async findByPhoneNumber(req:Request, res:Response){
        try {
            const {telefone} = req.params;
            const usuario = await this.userRepository.findByPhoneNumber(telefone)

            res.status(200).json(usuario)
        } catch (error: any) {
            console.error("[PROCURAR POR NUMERO DE TELEFONE USUARIO CONTROLLER] ERRO AO PROCURAR USUARIO")
            
        }
    }
}