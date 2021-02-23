export function getS3ServiceToken(endpoint: string): string {
  return `S3Service${endpoint}`;
}