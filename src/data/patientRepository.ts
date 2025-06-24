import * as path from 'path';
import { fileURLToPath } from 'url';
import { readJSONFile } from '../utils/readJsonFile.js';
import { PatientMockData } from '../services/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mockDataDir = path.resolve(__dirname);
const patientsFilePath = path.join(mockDataDir, process.env.FILE_NAME as string);

export const getPatientData = () => {
    try {
        return readJSONFile<PatientMockData>(patientsFilePath);
    } catch (err) {
        throw new Error(`Failed to load patient data from ${patientsFilePath}: ${(err as Error).message}`)
    }

}

export const getPatients = () =>getPatientData().patients || [];


export const getHeartRateReadings = () =>getPatientData().heartRateReadings || [];


