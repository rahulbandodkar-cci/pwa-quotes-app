export const toggleLoader = () => {
    return {
        type: "TOGGLE_LOADER"
    }
}

export const toggleAlert = (payload) => {
    return {
        type: "TOGGLE_ALERT",
        payload: payload
    }
}