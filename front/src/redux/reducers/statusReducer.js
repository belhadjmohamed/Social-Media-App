import {ALERT_TYPES} from '../actions/alertActions';



const StatusReducer = (state = false,action) => {
    switch(action.type){
        case ALERT_TYPES.STATUS:
            return action.payload;
        default :
            return state;
    }
}

export default StatusReducer;