"use strict";
class User {
    constructor(email, password) {
        this._password = '';
        this._email = email;
        hashPassword(password).then(hashedPassword => {
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
(async () => {
    const user = new User('adam@example.com', 'securepassword');
    setTimeout(async () => {
        console.log(await user.check('adam@example.com', 'securepassword'));
        console.log(await user.check('adam@example.com', 'wrongpassword'));
    }, 100);
})();
