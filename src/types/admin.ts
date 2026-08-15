export interface AdminProfile {
  username: string;
  language: string;
  last_updated: string;
}

export interface AdminPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface AdminProfilesResponse {
  profiles: AdminProfile[];
  pagination: AdminPagination;
}

export interface AdminUpdateResponse {
  message: string;
  username: string;
  language: string;
  last_updated: string;
  result: unknown;
}