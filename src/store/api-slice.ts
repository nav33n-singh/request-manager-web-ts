import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { 
  LoginRequest, 
  LoginResponse, 
  CreateRequestPayload, 
  ApproveRequestPayload,
  CloseRequestPayload,
  QueueRequestPayload,
  QueueResponse,
  ApiResponse,
  AssigneeResponse
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4001/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers: Headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Request'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  endpoints: (builder: any) => ({
    // @ts-ignore - RTK Query builder types are complex
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: '/auth/user/authenticate',
        method: 'POST',
        body: credentials,
      }),
    }),
    // @ts-ignore - RTK Query builder types are complex
    createRequest: builder.mutation<ApiResponse<{ success: boolean }>, CreateRequestPayload>({
      query: (payload: CreateRequestPayload) => ({
        url: '/request/create',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Request'],
    }),
    // @ts-ignore - RTK Query builder types are complex
    approveRequest: builder.mutation<ApiResponse<{}>, ApproveRequestPayload>({
      query: (payload: ApproveRequestPayload) => ({
        url: '/request/approve',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Request'],
    }),
    // @ts-ignore - RTK Query builder types are complex
    closeRequest: builder.mutation<ApiResponse<{}>, CloseRequestPayload>({
      query: (payload: CloseRequestPayload) => ({
        url: '/request/close',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Request'],
    }),
    // @ts-ignore - RTK Query builder types are complex
    getMyRequests: builder.query<QueueResponse, QueueRequestPayload>({
      query: (payload: QueueRequestPayload) => ({
        url: '/request/mine',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['Request'],
    }),
    // @ts-ignore - RTK Query builder types are complex
    getManagerQueue: builder.query<QueueResponse, QueueRequestPayload>({
      query: (payload: QueueRequestPayload) => ({
        url: '/request/managerQueue',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['Request'],
    }),
    // @ts-ignore - RTK Query builder types are complex
    getAssigneeQueue: builder.query<QueueResponse, QueueRequestPayload>({
      query: (payload: QueueRequestPayload) => ({
        url: '/request/assigneeQueue',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['Request'],
    }),
    // @ts-ignore - RTK Query builder types are complex
    getAssignees: builder.query<AssigneeResponse, QueueRequestPayload>({
      query: (payload: QueueRequestPayload) => ({
        url: '/request/assignees',
        method: 'GET',
        params: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateRequestMutation,
  useApproveRequestMutation,
  useCloseRequestMutation,
  useGetMyRequestsQuery,
  useGetManagerQueueQuery,
  useGetAssigneeQueueQuery,
  useGetAssigneesQuery,
} = apiSlice;

