import { WARNING_HEART_RATE_THRESHOLD } from "../../config/analytics.config.js";
import { getHeartRateReadingByPatientId } from "../../data/patientQueries.js";
import { getHeartRateReadings } from "../../data/patientRepository.js";
import { PatientId, HeartRateReading, PatientHeartRateResult } from "../types.js";


const filterByHeartRateThreshold = (heartRateReading: HeartRateReading) =>
    heartRateReading.heartRate >= WARNING_HEART_RATE_THRESHOLD;

const filterHeartRateByTimeRange = (fromTime: number, toTime: number) => (hr: HeartRateReading) => {
    const timestamp = new Date(hr.timestamp).getTime();
    return timestamp >= fromTime && timestamp <= toTime;
};

export const getFilteredPatientHeartRateData = (patientId: PatientId, cb: (hr: HeartRateReading) => boolean): PatientHeartRateResult => {
    const patientHeartRates = getHeartRateReadingByPatientId(patientId);
    if (!patientHeartRates) {
        return { error: 'patient not found' };
    };
    return { data: patientHeartRates.filter(cb) };
}

export const getAllPatientHeartRateThatReachThreshold = (patientId: PatientId) =>
    getFilteredPatientHeartRateData(patientId, filterByHeartRateThreshold)

export const getAllPatientHeartRateByTimeRange = (patientId: PatientId, from: string, to: string): PatientHeartRateResult => {
    const fromTime = new Date(from).getTime();
    const toTime = new Date(to).getTime();
    if (isNaN(fromTime) || isNaN(toTime)) {
        return { error: 'invalid time range' };
    }
    return getFilteredPatientHeartRateData(patientId, filterHeartRateByTimeRange(fromTime, toTime));
};

export const getAllHeartRateThatReachThreshold = () =>
    getHeartRateReadings().filter(filterByHeartRateThreshold);


export const getPatientHeartRateStats = (patientId: PatientId, fromTime: string, toTime: string) => {
    const patientHeartRates = getAllPatientHeartRateByTimeRange(patientId, fromTime, toTime);
    if ('error' in patientHeartRates) {
        return patientHeartRates;
    }
    const heartRates = patientHeartRates.data.map(hr => hr.heartRate);
    if (heartRates.length === 0) return { avg: null, min: null, max: null };
    const heartRatesSum = heartRates.reduce((acc, val) => acc + val, 0);
    return {
        avg: (heartRatesSum / heartRates.length).toFixed(2),
        max: Math.max(...heartRates),
        min: Math.min(...heartRates)
    }
}