import { Router, Request, Response } from 'express';
import { pool } from '../../../../config/postgresConfig.js';
import { CardapioController } from '../controllers/CardapioController.js';

const cardapioRoute = Router();
const controller = new CardapioController(pool);

cardapioRoute.get('/', async (req: Request, res: Response) => { 
    await controller.list(req, res);
});

cardapioRoute.get('/whatsapp', async (req: Request, res: Response) => {
    await controller.formatarParaWhatsApp(req, res);
});

cardapioRoute.get('/:id', async (req: Request, res: Response) => {
    await controller.findById(req, res);
});

export default cardapioRoute;