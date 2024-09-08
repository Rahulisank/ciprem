import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { POST } from "@/constants/httpMethod";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_KEY }),
  tagTypes: ["all-groups", "single-groups", "joined-groups", "my-groups"],
  endpoints: (builder) => ({
    checkEmail: builder.mutation({
      query: (body) => ({
        url: API_ENDPOINTS.checkEmail,
        method: POST,
        body: body,
      }),
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: API_ENDPOINTS.signUp,
        method: POST,
        body: body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: API_ENDPOINTS.login,
        method: POST,
        body: body,
      }),
    }),
    createGroup: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.createGroup,
        method: POST,
        body: formData,
      }),
      invalidatesTags: ["my-groups"],
    }),

    singleGroup: builder.query({
      query: (query) => ({
        url: API_ENDPOINTS.singleGroup,
        method: POST,
        body: query,
      }),
      providesTags: ["single-groups"],
    }),

    editGroup: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.editGroup,
        method: POST,
        body: formData,
      }),
      invalidatesTags: ["single-groups"],
    }),

    joinGroup: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.joinGroup,
        method: POST,
        body: data,
      }),
      invalidatesTags: ["joined-groups", "single-groups"],
    }),

    allGroup: builder.query({
      query: () => ({
        url: API_ENDPOINTS.allGroup,
        method: POST,
      }),
      providesTags: ["all-groups"],
    }),
    joinedGroups: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.joinedGroups,
        method: POST,
        body: data,
      }),
      providesTags: ["joined-groups"],
    }),
    myGroups: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.myGroups,
        method: POST,
        body: data,
      }),
      providesTags: ["my-groups"],
    }),
    deleteGroup: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.deleteGroups,
        method: POST,
        body: formData,
      }),
      invalidatesTags: ["my-groups"],
    }),
    leaveGroup: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.leaveGroup,
        method: POST,
        body: formData,
      }),
      invalidatesTags: ["single-groups", "joined-groups"],
    }),
  }),
});

export const {
  useCheckEmailMutation,
  useSignUpMutation,
  useLoginMutation,
  useCreateGroupMutation,
  useAllGroupQuery,
  useSingleGroupQuery,
  useJoinGroupMutation,
  useEditGroupMutation,
  useJoinedGroupsQuery,
  useMyGroupsQuery,
  useDeleteGroupMutation,
  useLeaveGroupMutation,
} = api;
