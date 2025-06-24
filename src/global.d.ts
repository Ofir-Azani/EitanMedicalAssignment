declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            FILE_NAME: string;
            WARNING_HEART_RATE_THRESHOLD: number
        }
    }
}