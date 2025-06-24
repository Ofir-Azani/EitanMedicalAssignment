import { Request, Response, NextFunction } from 'express';

export const validatePatientIdExists = (req: Request,res: Response,next: NextFunction) => {
    const { patientId } = req.params;

    if (!patientId) {
        res.status(400).json({ error: '"patientId" is required' });
        return;
    }

    next();
};
