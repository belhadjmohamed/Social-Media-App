import { NOTIFY_TYPES } from "../actions/notifyActions";
import { DeleteData,  EditData} from '../actions/alertActions';


const initialeState = {
    loading : false,
    data : [],
    sound : false
}


const notifyReducer = (state = initialeState,action) => {
    switch(action.type){
        case NOTIFY_TYPES.GET_NOTIFIES:
            return {
                ...state,
                data : action.payload
            };
        case NOTIFY_TYPES.CREATE_NOTIFIES:
            return {
                 ...state,
                data : [...state.data , action.payload]
            };
        case NOTIFY_TYPES.REMOVE_NOTIFIES:
            return {
                ...state,
                data : state.data.filter(item => item.id !== action.payload.id || item.url !== action.payload.url)
            };
        case NOTIFY_TYPES.UPDATE_NOTIFIES:
            return {
                ...state,
                data : EditData(state.data, action.payload._id, action.payload)
            };

        case NOTIFY_TYPES.DELETE_NOTIFIES:
            return {
                ...state,
                data : action.payload
            };
        default :
            return state;
    }
}

export default notifyReducer;