"use strict";
class User {
    constructor(email, password) {
        this._password = '';
        this._email = email;
        this.setPassword(password);
    }
    set email(value) {
        this._email = value;
    }
    get email() {
        return this._email;
    }
    set password(value) {
        this.setPassword(value);
    }
    get password() {
        return this._password;
    }
    async check(email, password) {
        const hashedPassword = await this.hashPassword(password);
        return this._email === email && this._password === hashedPassword;
    }
    async setPassword(password) {
        this._password = await this.hashPassword(password);
        console.log(this.password);
    }
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    }
}
(async () => {
    const user = new User('agnieszka@example.com', 'goodpassword');
    setTimeout(async () => {
        console.log(await user.check('agnieszka@example.com', 'goodpassword'));
        console.log(await user.check('agnieszka@example.com', 'wrongpassword'));
        console.log(user.password);
    }, 100);
})();
