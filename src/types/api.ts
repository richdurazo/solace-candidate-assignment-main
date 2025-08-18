export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export interface AdvocatesResponse extends ApiResponse {
  data: Advocate[];
  count: number;
}

export interface SeedResponse extends ApiResponse {
  advocates: Advocate[];
  count: number;
}

export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: unknown;
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date | null;
}
