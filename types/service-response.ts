export interface ServiceResponse<T = unknown> {
  success: boolean | null;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}