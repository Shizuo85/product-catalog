import { Request, Response, NextFunction } from 'express';

class GeneralController {
    async default(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json({ data: 'Server running!!!' });
        } catch (err) {
            return next(err);
        }
    }
}

export default new GeneralController();
