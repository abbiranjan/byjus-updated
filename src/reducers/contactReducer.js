import { GET_CONTACTS, VERIFY_CONTACT, RESET_CONTACT } from '../action/type';
import userData from '../json/userData';
const initialState = {
    contacts: userData,
    uniqueContact: userData
};

export default function(state= initialState, action) {
    switch(action.type) {
        case GET_CONTACTS:
        return {
            ...state
        };
        case VERIFY_CONTACT:
        return {
            ...state,
            contacts : userData.filter((contact)=>
            contact.username === action.payload.username && contact.password === action.payload.password)
        };
        case RESET_CONTACT:
        return {
            ...state,
            uniqueContact: state.contacts.map((contact)=> contact.password = action.payload.password)
           
       }
        default:
            return state;
    }
}