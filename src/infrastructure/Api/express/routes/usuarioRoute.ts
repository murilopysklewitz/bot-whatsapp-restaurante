import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";
import { UsuarioRepository } from "../../../repository/usuarioRepository";
import { pool } from "../../../../config/postgresConfig";

export async function usuarioRoute(){
const usuarioRouter = Router();
const repository = new UsuarioRepository(pool)

const usuarioController = new UsuarioController(repository)

usuarioRouter.get("/:telefone", usuarioController.findByPhoneNumber)
usuarioRouter.post("/", usuarioController.save)

return usuarioRouter
}