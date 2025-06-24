import { Router } from 'express';
import { patientRouter } from './patient.js';

const v1Router = Router();

v1Router.use('/patients', patientRouter);

export { v1Router }