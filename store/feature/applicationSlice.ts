import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myAxios } from "../../src/config/axios";
import { ApplicationFormData } from "./interface";

export type UpdateApplication = Partial<ApplicationFormData>;
type InitialStateAttr = {
	isLoading: boolean;
	applicationForm: ApplicationFormData | null;
	message?: {
		status: "success" | "failed";
		message: string;
	} | null;
};

const initialState: InitialStateAttr = {
	isLoading: false,
	applicationForm: null,
	message: null,
};

export const getApplicationFormData = createAsyncThunk("getApplicationForm", async () => {
	try {
		const res = await myAxios.get("/518.4853421234426/programs/esse/application-form");
		return res.data.data;
	} catch (error) {
		console.log(error);
	}
});

export const updateApplication = createAsyncThunk("updateApplication", async (action: UpdateApplication, thunkApi) => {
	try {
		const application = { data: { ...action } };
		await myAxios.put("/613.6842209706826/programs/assumenda/application-form", application);
		thunkApi.dispatch(setMessage({ status: "success", message: "Application created successfully" }));
		thunkApi.dispatch(getApplicationFormData());
	} catch (error) {
		console.log(error);
		thunkApi.dispatch(setMessage({ status: "failed", message: "Failed to create application" }));
	}
});

export const ApplicationSlice = createSlice({
	name: "application",
	initialState,
	reducers: {
		setMessage: (state, action: PayloadAction<InitialStateAttr["message"]>) => {
			state.message = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getApplicationFormData.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.applicationForm = payload;
		});
		builder.addCase(getApplicationFormData.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getApplicationFormData.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateApplication.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateApplication.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateApplication.fulfilled, (state) => {
			state.isLoading = false;
		});
	},
});

export default ApplicationSlice.reducer;
export const { setMessage } = ApplicationSlice.actions;
