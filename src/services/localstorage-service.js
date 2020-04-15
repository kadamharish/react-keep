import * as Constant from '../constants'

export default function getUserData() {
    const data = JSON.parse(localStorage.getItem(Constant.USER_DETAILS));
    const userData = data ? data : [];
    return userData
};
