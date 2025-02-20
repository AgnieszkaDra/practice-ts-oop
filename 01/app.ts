class User {
    private _email: string;
    private _password: string = '';

    constructor(email: string, password: string) {
        this._email = email;
        this.setPassword(password); 
    }

    set email(value: string) {
        this._email = value;
    }

    get email(): string {
        return this._email;
    }

    set password(value: string) {
        this.setPassword(value); 
    }

    get password(): string {
        return this._password; 
    }

    async check(email: string, password: string): Promise<boolean> {
        const hashedPassword = await this.hashPassword(password);
        return this._email === email && this._password === hashedPassword;
    }

    private async setPassword(password: string): Promise<void> {
        this._password = await this.hashPassword(password);
        console.log(this.password)
    }

    private async hashPassword(password: string): Promise<string> {
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