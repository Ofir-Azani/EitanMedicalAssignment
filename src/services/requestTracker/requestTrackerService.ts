const requestCountMap = new Map<string, number>();

export const incrementPatientRequest = (patientId: string) => {
  const current = requestCountMap.get(patientId) || 0;
  requestCountMap.set(patientId, current + 1);
};

export const getPatientRequestCount = (patientId: string) => 
  requestCountMap.get(patientId) || 0;

