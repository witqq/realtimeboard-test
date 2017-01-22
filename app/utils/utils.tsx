export const getRandomEmail = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for (let ii = 0; ii < 15; ii++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${string}@mail.ru`;
};

export const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

