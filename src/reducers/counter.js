<<<<<<< HEAD:src/modules/counter.js
// actions 액션 타입
const INCREMENT = 'counterReducer/INCREMENT';
const DECREMENT = 'counterReducer/DECREMENT';
// 이 패턴에서 따를 규칙은, 액션 타입을 만들때 reducer/ACTION_TYPE 의 형식으로 만들어야 합니다.

// action creator 액션 생성자
export const increment = () => ({ type : INCREMENT }); 
export const decrement = () => ({ type : DECREMENT });

const initialState = 0;

//리듀서
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            if (state > 0){
                return state - 1;
            } else {
                return state;
            }
        default:
            return state;
    }
}

=======
// actions 액션 타입
const INCREMENT = 'counterReducer/INCREMENT';
const DECREMENT = 'counterReducer/DECREMENT';
// 이 패턴에서 따를 규칙은, 액션 타입을 만들때 reducer/ACTION_TYPE 의 형식으로 만들어야 합니다.

// action creator 액션 생성자
export const increment = () => ({ type : INCREMENT }); 
export const decrement = () => ({ type : DECREMENT });

const initialState = 0;

//리듀서
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
}

>>>>>>> 830d70bfff971e7384f9fd6074808854aa4bc247:src/reducers/counter.js
export default counterReducer;