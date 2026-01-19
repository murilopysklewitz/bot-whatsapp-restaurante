import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";
import { UsuarioRepository } from "../../../repository/usuarioRepository";
import { pool } from "../../../../config/postgresConfig";

export function usuarioRoute() { 
    const usuarioRouter = Router();
    const repository = new UsuarioRepository(pool);
    const usuarioController = new UsuarioController(repository);

    usuarioRouter.get("/:telefone", usuarioController.findByPhoneNumber);
    usuarioRouter.post("/", usuarioController.save);
    usuarioRouter.put("/mudarEstado", usuarioController.changeState)

    return usuarioRouter;
}