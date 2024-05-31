import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create an async thunk for image upload
export const ImageUpload = createAsyncThunk(
    "image/upload",
    async (e, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("upload_preset", "zmqhhsjp");

            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dnv4qkzpv/image/upload",
                formData
            );
            return response.data.secure_url;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const UploadSlice = createSlice({
    name: "upload",
    initialState: {
        imageUpload: {
            loading: false,
            success: false,
            error: false,
            data: [],
            errorMessage: null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ImageUpload.pending, (state) => {
                state.imageUpload.loading = true;
                state.imageUpload.success = false;
                state.imageUpload.error = false;
                state.imageUpload.errorMessage = null;
            })
            .addCase(ImageUpload.fulfilled, (state, action) => {
                state.imageUpload.success = true;
                state.imageUpload.loading = false;
                state.imageUpload.data = action.payload;
            })
            .addCase(ImageUpload.rejected, (state) => {
                state.imageUpload.error = true;
                state.imageUpload.success = false;
                state.imageUpload.loading = false;
            });
    }
});

export default UploadSlice.reducer;
// nothing

