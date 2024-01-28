export const setItemWithExpiry = (key, value, minutesToExpire) => {
    const now = new Date();
    const expiryTime = now.getTime() + minutesToExpire * 60 * 1000;
    const item = {
        value: value,
        expiry: expiryTime,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getItemWithExpiry = (key) => {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
        return null;
    }
    const item = JSON.parse(itemString);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        if (key==='token'){
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('currency');
        }
        return null;
    }
    return item.value;
};  