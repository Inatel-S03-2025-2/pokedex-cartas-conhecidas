import 'dotenv/config';
import { readFileSync } from 'fs';

export function checkMissingEnvVars(): boolean {
  const envExample = readFileSync('.env.example', 'utf8');
  
  const missingVars = envExample
    .split('\n')
    .filter((line: string) => line.includes('=') && !line.startsWith('#'))
    .map((line: string) => line.split('=')[0])
    .filter((varName: string) => !process.env[varName]);
  
  const hasMissingVars = missingVars.length > 0;
  return hasMissingVars;
}
