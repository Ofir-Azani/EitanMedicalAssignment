import * as fs from 'fs';

export const isFileExistInPath = (filePath: string) => fs.existsSync(filePath);

export const readJSONFile = <T>(filePath: string): T => {
    if (!isFileExistInPath) {
        throw new Error(`The requested .json file not found at ${filePath}`);
    }
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`Faild to read or parse .json file at ${filePath}`);
    }
}