import { WARNING_HEART_RATE_THRESHOLD } from "../config/analytics.config.js";
import { Patient, PatientId, HeartRateReading, PatientHeartRateResult } from "../services/types.js";
import { getPatientData } from "./patientRepository.js";

export const findPatientById = (patients: Patient[], patientId: PatientId) => {
    if (patients.length === 0) return null;
    return patients.find(p => p.id === patientId) || null;
}


export const getHeartRateReadingByPatientId = (patientId: PatientId) => {
    const { patients, heartRateReadings } = getPatientData();
    const requstedPatient = findPatientById(patients, patientId);
    if (!requstedPatient) return null;
    return heartRateReadings.filter(hr => hr.patientId === patientId);
}

