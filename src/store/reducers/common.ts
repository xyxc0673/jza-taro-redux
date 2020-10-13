import { SET_SYSTEM_INFO } from '@/store/constants/common';

const initialState = {
    systemInfo: {}
}

export default function common(state=initialState, action) {
    switch(action.type){
        case SET_SYSTEM_INFO:
            return {
                ...state,
                systemInfo: {...action.payload.systemInfo}
            }
        default:
            return state
    }
}