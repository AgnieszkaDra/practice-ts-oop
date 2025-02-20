"use strict";
class UUID {
    static generateSegment() {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let segment = '';
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            segment += characters[randomIndex];
        }
        return segment;
    }
    static generate() {
        const uuid = `${this.generateSegment()}-${this.generateSegment()}-${this.generateSegment()}-${this.generateSegment()}`;
        this.uuid = uuid; // Store the generated UUID
        this.count++;
        return uuid;
    }
    static validate(uuid) {
        const regex = /^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/;
        return regex.test(uuid);
    }
    static wasGenerated(uuid) {
        return this.uuid === uuid;
    }
}
UUID.count = 0;
UUID.uuid = null; // Store the last generated UUID for verification
class Product {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.uuid = UUID.generate();
    }
}
class Book extends Product {
    constructor(title, author) {
        super(title, author);
    }
}
const book1 = new Book('title1', 'author1');
const book2 = new Book('title2', 'author2');
const book3 = new Book('title3', 'author3');
console.log(book1.uuid);
console.log(book2.uuid);
console.log(book3.uuid);
console.log(UUID.count);
console.log(UUID.wasGenerated(book1.uuid));
