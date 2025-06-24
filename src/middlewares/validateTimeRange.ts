import { Request, Response, NextFunction } from 'express';

export const validateTimeRange = (req: Request, res: Response, next: NextFunction) => {
    const { from, to } = req.query;

    if (!from || !to) {
        res.status(400).json({ error: 'Both "from" and "to" query parameters are required' });
        return;
    }

    const fromTime = new Date(from as string).getTime();
    const toTime = new Date(to as string).getTime();
    const now = Date.now();

    if (isNaN(fromTime) || isNaN(toTime)) {
        res.status(400).json({ error: '"from" and "to" must be valid ISO date strings' });
        return;
    }

    if (fromTime > toTime) {
        res.status(400).json({ error: '"from" must be before or equal to "to"' });
        return;
    }

    if (fromTime > now || toTime > now) {
        res.status(400).json({ error: 'Dates must not be in the future' });
        return;
    }

    next();
};
