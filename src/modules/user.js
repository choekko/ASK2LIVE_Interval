const GIVEUSER = 'user/GIVEUSER'

export const giveUser = (given) => ({ type : GIVEUSER, user : given })

const storageUser = localStorage.getItem("user")
console.log(storageUser)
const initialState =  storageUser ? JSON.parse(storageUser) : {};

const user = (state = initialState, action) => {
    switch (action.type) {
        case GIVEUSER:
            state = action.user;
            return state;
        default:
            return state;
    }
}

export default user;