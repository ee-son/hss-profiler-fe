export interface AdminProfile {
  username: string;
  language: string;
  last_updated: string;
}

export interface AdminProfilesResponse {
  profiles: AdminProfile[];
}

export interface AdminUpdateResponse {
  message: string;
  username: string;
  language: string;
  last_updated: string;
  result: unknown;
}