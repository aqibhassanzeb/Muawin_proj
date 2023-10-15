import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const baseURL = "http://localhost:3333/api/v1";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authReducer?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "muawin-api",
  tagTypes: ["User", "Event", "Todo"],
  endpoints: (build) => ({
    Register: build.mutation({
      query: (data) => {
        return {
          url: "/user_signup",
          method: "POST",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    Login: build.mutation({
      query: (data) => {
        return {
          url: "/user_login",
          method: "POST",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    verifyOTP: build.mutation({
      query: (data) => {
        return {
          url: "/user_verify",
          method: "PUT",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    verifyForgotOTP: build.mutation({
      query: (data) => {
        return {
          url: "/reset_passcode",
          method: "PUT",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    resetPasscode: build.mutation({
      query: (data) => {
        return {
          url: "/reset_passcode",
          method: "PUT",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    resetPassword: build.mutation({
      query: (data) => {
        return {
          url: `/reset_password`,
          method: "PUT",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    userUpdate: build.mutation({
      query: (data) => {
        return {
          url: `/user_update/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["User"],
    }),
    pictureUpload: build.mutation({
      query: (imageFile) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file", imageFile);
        console.log({ bodyFormData, imageFile });
        return {
          url: "/picture_upload",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          body: { bodyFormData },
          formData: true,
        };
      },
    }),
    getCities: build.query({
      query: (param) => `/cities/${param}`,
    }),
    addEvent: build.mutation({
      query: (data) => {
        return {
          url: "/event/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Event"],
    }),
    updateEvent: build.mutation({
      query: (param) => {
        return {
          url: `/event/update/${param.id}`,
          method: "PUT",
          body: param.data,
        };
      },
      invalidatesTags: ["Event"],
    }),
    AllEvents: build.query({
      query: () => "/events",
      providesTags: ["Event"],
    }),
    calendarEvents: build.query({
      query: () => "/events/calendar",
      providesTags: ["Event"],
    }),
    getAllUsers: build.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    getTodos: build.query({
      query: (id) => `/todos/${id}`,
      providesTags: ["Todo"],
    }),
    addTodo: build.mutation({
      query: (data) => {
        return {
          url: "/todos",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Todo"],
    }),
    updateTodo: build.mutation({
      query: (param) => {
        return {
          url: `/todos/${param.id}`,
          method: "PUT",
          body: param.data,
        };
      },
      invalidatesTags: ["Todo"],
    }),
    addWatchCat: build.mutation({
      query: (data) => {
        return {
          url: "/watch_cat_create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["WatchCat"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
  useUserUpdateMutation,
  useGetAllUsersQuery,
  useUpdateWatchMutation,
  usePictureUploadMutation,
  useAddWatchCatMutation,
  useVerifyForgotOTPMutation,
  useLazyGetCitiesQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useAllEventsQuery,
  useCalendarEventsQuery,
  useAddTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} = api;

export function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${baseURL}/picture_upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        resolve(response.imageUrls);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function uploadFiles(files, setProgress) {
  const totalFiles = Array.from(files).length;
  console.log(totalFiles);
  let uploadedFiles = 0;

  const uploadPromises = Array.from(files).map(async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    try {
      const res = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/raw/upload`,
        data,
      });
      console.log(res);

      uploadedFiles++; // Increment the count of uploaded files
      const totalProgress = (uploadedFiles / totalFiles) * 100;
      setProgress(Math.round(totalProgress));

      const responseData = {
        name: file.name,
        type: file.type,
        size: res.data.bytes,
        url: res.data.secure_url,
      };

      return responseData;
    } catch (error) {
      console.error("Error uploading files:", error.message);
    }
  });

  try {
    const uploadResults = await Promise.all(uploadPromises);
    return uploadResults;
  } catch (error) {
    console.error("Error uploading files:", error.message);
  }
}