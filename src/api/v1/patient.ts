import { Router, type Request, type Response } from 'express';
import { getAllPatientHeartRateThatReachThreshold, getPatientHeartRateStats } from '../../services/patients/patientsSerice.js';
import { validateTimeRange } from '../../middlewares/validateTimeRange.js';
import { getPatientRequestCount, incrementPatientRequest } from '../../services/requestTracker/requestTrackerService.js';
import { validatePatientIdExists } from '../../middlewares/validatePatientIdExists.js';

const patientRouter = Router();

patientRouter.get('/:patientId/high-heart-rates', validatePatientIdExists, (req: Request, res: Response) => {
  const { patientId } = req.params;
  incrementPatientRequest(patientId as string);

  const result = getAllPatientHeartRateThatReachThreshold(patientId as any);

  if ('error' in result) {
    res.status(404).json({ error: result.error });
    return
  }

  res.json({ readings: result.data });
  return
});


patientRouter.get('/:patientId/stats', [validatePatientIdExists, validateTimeRange], (req: Request, res: Response) => {
  const { patientId } = req.params;
  const { from, to } = req.query;

  if (!from || !to) {
    res.status(400).json({ error: 'from and to query parameters are required' });
    return;
  }

  incrementPatientRequest(patientId as string);
  const result = getPatientHeartRateStats(patientId as any, from as string, to as string);

  if ('error' in result) {
    res.status(404).json({ error: result.error });
    return
  }

  res.json(result);
  return
});


patientRouter.get('/:patientId/requests', (req: Request, res: Response) => {
  const { patientId } = req.params;
  const count = getPatientRequestCount(patientId as string);
  res.json({ patientId, requests: count });
  return
});

export { patientRouter }