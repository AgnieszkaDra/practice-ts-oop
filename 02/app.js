"use strict";
class UUID {
    static generate(title, author) {
        const key = `${title}-${author}`;
        if (UUID.uuidMap.has(key)) {
            return UUID.uuidMap.get(key);
        }
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
        UUID.uuidMap.set(key, uuid);
        UUID.count++;
        return uuid;
    }
    static validate(uuid) {
        const regex = /^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/;
        return regex.test(uuid);
    }
}
UUID.count = 0;
UUID.uuidMap = new Map();
class Product {
    constructor(title, author) {
        this.uuid = UUID.generate(title, author);
    }
}
class Book extends Product {
    constructor(title, author) {
        super(title, author);
        this.title = title;
        this.author = author;
    }
}
const book1 = new Book('title2', 'author2');
const book2 = new Book('title2', 'author2');
const book3 = new Book('title2', 'author3');
console.log(book1.uuid);
console.log(book2.uuid);
console.log(book3.uuid);
console.log(UUID.count);
