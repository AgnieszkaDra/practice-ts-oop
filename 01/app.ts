class User {
    private _email: string;
    private _password: string = '';

    constructor(email: string, password: string) {
        this._email = email;
        hashPassword(password).then(hashedPassword => {
            this._password = hashedPassword;
        });
    }

    set email(value: string) {
        this._email = value;
    }

    get email(): string {
        return this._email;
    }

    async check(email: string, password: string): Promise<boolean> {
        const hashedPassword = await hashPassword(password); 

        return this._email === email && this._password === hashedPassword; 
    }
}

async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}


(async () => {
    const user = new User('agnieszka@example.com', 'goodpassword');

    setTimeout(async () => {
        console.log(await user.check('agnieszka@example.com', 'goodpassword')); 
        console.log(await user.check('agnieszka@example.com', 'wrongpassword'));  
    }, 100);

})();