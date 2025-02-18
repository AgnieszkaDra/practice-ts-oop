class UUID {
    static count: number = 0;

    static generate(): string {
        const generateSegment = () => {
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';  
            let segment = '';
   
            for (let i = 0; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);  
                segment += characters[randomIndex]; 
            }
            
            return segment;
        };

        const uuid = `${generateSegment()}-${generateSegment()}-${generateSegment()}-${generateSegment()}`;
        UUID.count++; 
        return uuid;
    }

    static validate(uuid: string): boolean {
        const regex = /^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/;
        return regex.test(uuid);
    }
}

abstract class Product {
    uuid: string;

    constructor() {
        this.uuid = UUID.generate();
    }
}

class Book extends Product {
    author: string;
    title: string;

    constructor(title: string, author: string) {
        super(); 
        this.title = title;
        this.author = author;
    }
}

const book1 = new Book('title2', 'author2');
const book2 = new Book('title2', 'author2');

console.log(book1.uuid); 
console.log(book2.uuid); 
console.log(UUID.count); 