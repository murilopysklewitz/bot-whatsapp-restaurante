import { Request, Response } from "express";
import { IuserRepository } from "../../../../domain/gateway/userGateway";

export class UsuarioController {
    constructor(private readonly userRepository: IuserRepository) {}

    save = async (req: Request, res: Response): Promise<void> => {
        try {
            const { nome, telefone, endereco } = req.body;

            if (!nome || !telefone) {
                res.status(400).json({
                    sucesso: false,
                    erro: "Nome e telefone são obrigatórios"
                });
                return;
            }

            await this.userRepository.save(nome, telefone, endereco);

            res.status(201).json({
                sucesso: true,
                mensagem: "Usuário criado com sucesso"
            });

        } catch (error: any) {
            console.error("[SAVE USUARIO CONTROLLER] Erro:", error.message);

            res.status(500).json({
                sucesso: false,
                erro: "Erro ao criar usuário"
            });
        }
    }

    findByPhoneNumber = async (req: Request, res: Response): Promise<void> => {
        try {
            const { telefone } = req.params;

            console.log(`🔍 Buscando usuário: ${telefone}`);

            const usuario = await this.userRepository.findByPhoneNumber(telefone);

            if (!usuario) {
                console.log(`ℹUsuário não existe, criando: ${telefone}`);
                
                await this.userRepository.save(
                    telefone,  
                    telefone,
                    undefined
                );

                const novoUsuario = await this.userRepository.findByPhoneNumber(telefone);

                res.status(200).json({
                    sucesso: true,
                    usuario: {
                        nome: novoUsuario?.getNome(),
                        telefone: novoUsuario?.getTelefone(),
                        endereco: novoUsuario?.getEndereco(),
                        estado: novoUsuario?.getEstado(),
                        novoUsuario: true
                    }
                });
                return;
            }

            res.status(200).json({
                sucesso: true,
                usuario: {
                    nome: usuario.getNome(),
                    telefone: usuario.getTelefone(),
                    endereco: usuario.getEndereco(),
                    estado: usuario.getEstado(),
                    novoUsuario: false
                }
            });

        } catch (error: any) {
            console.error("[FIND BY PHONE NUMBER CONTROLLER] Erro:", error.message);
            
            res.status(500).json({
                sucesso: false,
                erro: "Erro ao buscar usuário"
            });
        }
    }

    changeState = async (req: Request, res: Response) =>{
        try{
            const { telefone, novoEstado} = req.body
            const response = await this.userRepository.changeState(telefone, novoEstado)
            res.status(200).json({
                Estado: response
            })
        }catch(error:any){
            console.error("[CHANGE STATE CONTROLLER] Erro:", error.message);
            
            res.status(500).json({
                sucesso: false,
                erro: "Erro ao atualizar usuário usuário"
            });
        }
    }
}