class User {
    constructor(name, lastName, books, pets) {
        this.name = name
        this.lastName = lastName
        this.books = books
        this.pets = pets
    }
    getFullName(){
        console.log(`Fullname: ${this.name} ${this.lastName}`)
    }
    addPets(pet) {
        this.pets.push(pet)
    }
    countPets() {
        console.log(this.pets.length)
    }
    addBook(name, author) {
        this.books.push({bookName: name, bookAuthor: author})
    }
    getBookNames() {
        let booksNames = []
        this.books.forEach(book => booksNames.push(book.bookName))
        console.log(booksNames)
    }
}

const user1 = new User('Agustin', 'Micheletti', [{bookName: 'Harry Potter', bookAuthor: 'JK Rowling'}], ['Dog','Cat'])

user1.getFullName()
user1.addPets('Hamster')
user1.countPets()
user1.addBook('The Lord of the rings', 'JRR Tolkien')
user1.getBookNames()
