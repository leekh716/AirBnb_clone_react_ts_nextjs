import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterRoomState {
	largeBuildingType: string | null; //집 종류
	buildingType: string | null; // 건물 유형
	roomType: string | null; // 숙소 유형
	isSetUpForGuest: boolean | null; // 게스트용 확인
}

const initialState: RegisterRoomState = {
	largeBuildingType: null,
	buildingType: null,
	roomType: null,
	isSetUpForGuest: null,
};

const registerRoom = createSlice({
	name: "registerRoom",
	initialState,
	reducers: {
		setLargeBuildingType(state, action: PayloadAction<string>) {
			if (action.payload === "") {
				state.largeBuildingType = null;
			}
			state.largeBuildingType = action.payload;
			return state;
		},
		setBuildingType(state, action: PayloadAction<string>) {
			if (action.payload === "") {
				state.buildingType = null;
			}
			state.buildingType = action.payload;
			return state;
		},
		setRoomType(state, action: PayloadAction<"entire" | "private" | "public">) {
			state.roomType = action.payload;
			return state;
		},
		setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
			state.isSetUpForGuest = action.payload;
			return state;
		},
	},
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
