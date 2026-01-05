import { Router, Request, Response } from 'express';
import { PedidoController } from '../controllers/PedidoController.js';
import { pool } from '../../../../config/postgresConfig.js';

const pedidoRoute = Router();
const controller = new PedidoController(pool);

pedidoRoute.post('/',  async (req: Request, res: Response) => {
    await controller.criar(req, res)
});

pedidoRoute.get('/:protocolo', async (req:Request, res: Response) => {
    await controller.consultar(req, res)
});

export default pedidoRoute;