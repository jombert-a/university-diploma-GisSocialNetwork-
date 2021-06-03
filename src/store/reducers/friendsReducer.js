export const SET_FRIENDS= "SET_FRIENDS";
export const NEW_MESSAGE= "NEW_MESSAGE";

const initialState = {
    friends: [{name: 'Алмакаев Руслан', id: 1}, {name: 'Батыров Радмир', id: 2}, {name: 'Дмитриев Владислав', id: 3}, {name: 'Дементьев Евгений', id: 4}, {name: 'Коваленко Иван', id: 5}, {name: 'Хуснутдинов Даниэль', id: 6}, {name: 'Лучший староста', id: 7}],
    activeDialogs: [
        {
            id: 3,
            messages: [
                {userId: 0, text: 'Привет, Влад'},
                {userId: 3, text: 'Привет, Роберт'}
            ]
        },
        {
            id: 5,
            messages: [
                {userId: 0, text: 'Привет, Ваня'},
                {userId: 5, text: 'Привет, Роберт'}
            ]
        },
        {
            id: 6,
            messages: [
                {userId: 0, text: 'Привет, Даня'},
                {userId: 6, text: 'Привет, Роберт'}
            ]
        },
        {
            id: 7,
            messages: [
                {userId: 0, text: 'Привет, Марат'},
                {userId: 7, text: 'Привет, Роберт'}
            ]
        }
    ]
}

export const setFriends = payload => ({
    type: SET_FRIENDS,
    payload
})

export function friendsReducer (state = initialState, action) {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friends: action.payload
            }
        case NEW_MESSAGE:
            console.log(action)
            console.log([...state.activeDialogs.filter(el => el.id !== action.payload.id), {id: action.payload.id, messages: [...state.activeDialogs.find(el => el.id === action.payload.id).messages, action.payload.message]}]);
            return {
                ...state,
                activeDialogs: [...state.activeDialogs.filter(el => el.id !== action.payload.id), {id: action.payload.id, messages: [...state.activeDialogs.find(el => el.id === action.payload.id).messages, action.payload.message]}]
            }
        default:
            return state;
    }
}