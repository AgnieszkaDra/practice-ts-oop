"use strict";
class User {
    constructor(email, password) {
        this._password = '';
        this._email = email;
        hashPassword(password).then((hashedPassword) => {
            this._password = hashedPassword;
        });
    }
    set email(value) {
        this._email = value;
    }
    get email() {
        return this._email;
    }
    async check(email, password) {
        const hashedPassword = await hashPassword(password);
        console.log("Hash of entered password:", hashedPassword);
        return this._email === email && this._password === hashedPassword;
    }
}
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
const user = new User('agnieszka@example.com', 'goodpassword');
user.check('agnieszka@example.com', 'goodpassword').then(result => {
    console.log(result);
});
user.check('agnieszka@example.com', 'wrongpassword').then(result => {
    console.log(result);
});
