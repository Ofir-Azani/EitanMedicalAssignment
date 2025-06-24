# Eitan Medical Assignment

A backend REST API that provides heart rate analytics and event tracking for patients. Built with Express and TypeScript.

## How to Use

1. Clone the repository:
git clone https://github.com/Ofir-Azani/EitanMedicalAssignment.git
cd EitanMedicalAssignment

2. Install dependencies:
pnpm install

3. Start the server:
pnpm dev

App will run on http://localhost:3000

### Alternative Appoach (starting from step 3)

3. Run pnpm build.

4. Make sure dist/data/patients.json exists.

5. Run pnpm start.


## Routes

All routes are prefixed with /api/v1/patients.

### 1. High Heart Rate Events

Returns all heart rate readings where a patient’s heart rate exceeded the configured threshold (e.g. 100 bpm).

GET /api/v1/patients/:patientId/high-heart-rates

Example:
GET /api/v1/patients/1/high-heart-rates

Response:
{
  "readings": [
    {
      "patientId": "1",
      "timestamp": "2024-03-01T10:30:00Z",
      "heartRate": 101
    }
  ]
}

### 2. Heart Rate Analytics

Calculates average, minimum, and maximum heart rate for a given patient within a specified time range.

GET /api/v1/patients/:patientId/stats?from=<from>&to=<to>

Query parameters:
- from: ISO timestamp (e.g. 2024-03-01T00:00:00Z)
- to: ISO timestamp (e.g. 2024-03-01T23:59:00Z)

Example:
GET /api/v1/patients/1/stats?from=2024-03-01T00:00:00Z&to=2024-03-01T23:59:00Z

Response:
{
  "avg": 92.3,
  "min": 85,
  "max": 101
}

### 3. Request Count

Returns how many times the patient’s data has been requested.

GET /api/v1/patients/:patientId/requests

Example:
GET /api/v1/patients/1/requests

Response:
{
  "patientId": "1",
  "requests": 4
}

## Architecture & Reasoning

- Modular structure separating routes, services, data, and validation logic.
- Pure functions and stateless services make logic testable and easy to cache or move.
- Typed end-to-end with TypeScript: from route params to business logic to config values.
- Middlewares for input validation, keeping endpoints clean.
- File-based data source to mimic an external database.

## Real-World Production Improvements

In a real-world production scenario, I would make the following changes:

- Caching: heart rate statistics would be cached in Redis with a short TTL to avoid recalculating for every request. LRU cache eviction strategy would prevent memory overflow.
- Persistent request tracking: instead of using an in-memory Map, I would publish events (e.g. patient.requested) to a broker like RabbitMQ or Kafka and persist request counts asynchronously in a database every hour.
- Secrets management: environment variables like FILE_NAME, PORT, and thresholds would come from a secure secrets manager (e.g. AWS Secrets Manager, Vault) or be injected by orchestration tooling instead of .env files.
