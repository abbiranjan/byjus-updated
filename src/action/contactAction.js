import { GET_CONTACTS, VERIFY_CONTACT, RESET_CONTACT } from './type';

export const getContacts = () => {
    return {
        type: GET_CONTACTS
    };
};
export const verifyCredential = (userdata) => {
    console.log('userdata', userdata);
    return {
        type: VERIFY_CONTACT,
        payload: userdata
    };
};

export const resetPassword = (newUserData) => {
    return {
        type: RESET_CONTACT,
        payload: newUserData
    };
};


