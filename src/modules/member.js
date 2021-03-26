
const initialState = []

const member = (state = initialState, action) => {
    switch (action.type) {
        case "GIVEMEMBER" :
            console.log("redux payload : ", action.payload);
            state = action.payload;
            return state
        default:
            return state
    }
}

export default member