const alertReducer = ( state = {show:false,msg:"",variant:"success"} , action ) => {
    switch(action.type){
        case "TOGGLE_ALERT":
            return {
                show:!(state.show),
                msg:action.payload.msg,
                variant:action.payload.variant
            };
        default: return {...state};
    }
}

export default alertReducer;