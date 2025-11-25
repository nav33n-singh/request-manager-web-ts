export type RequestStatus = 
  | "PendingApproval"
  | "Approved"
  | "Rejected"
  | "Closed";

export interface UserMeta {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string | null;
  email: string;
}

export interface RequestDetails {
  requestID: number;
  request: string;
  status: RequestStatus;
  requestor: UserMeta;
  assignee: UserMeta;
  approver: UserMeta | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  userName: string;
  mobileNo: string | null;
  phoneCode: string | null;
}

export interface PaginatedResult<T> {
  records: T[];
  total: number;
}

// API Request Types
export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
}

export interface CreateRequestPayload {
  request: string;
  assigneeId: number;
}

export interface ApproveRequestPayload {
  requestId: number;
  action: "Approved" | "Rejected";
  comment?: string | null;
}

export interface CloseRequestPayload {
  requestId: number;
}

export interface QueueRequestPayload {
  page: number;
  count: number;
}

export interface QueueResponse {
  success: boolean;
  message: string;
  data: PaginatedResult<RequestDetails>;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface AssigneeUserMeta {
  id: string | number;
  firstName: string;
  middleName: string | null;
  lastName: string | null;
  email: string;
}

export interface AssigneeResponse {
  success: boolean;
  message: string;
  data: AssigneeUserMeta[];
}

