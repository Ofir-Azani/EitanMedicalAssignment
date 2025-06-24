export type Branded<K, T> = K & { __brand: T };

export type PatientId = Branded<string, 'PatientId'>;
export type TimeUtcFormat = Branded<string, 'TimeUtcFormat'>;

export interface Patient {
    id: PatientId;
    name: string;
    age: number;
    gender: "male" | "female" | "ask the chat";
}

export interface HeartRateReading {
    patientId: PatientId;
    timestamp: string;
    heartRate: number
};

export interface PatientMockData {
    patients: Patient[];
    heartRateReadings: HeartRateReading[];
}

export type PatientHeartRateResult =
    | { error: string }
    | { data: HeartRateReading[] }


