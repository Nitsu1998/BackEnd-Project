class Usuario {
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

const usuario1 = new Usuario('Agustin', 'Micheletti', [{bookName: 'Harry Potter', bookAuthor: 'JK Rowling'}], ['Dog','Cat'])

usuario1.getFullName()
usuario1.addPets('Hamster')
usuario1.countPets()
usuario1.addBook('The Lord of the rings', 'JRR Tolkien')
usuario1.getBookNames()


console.log('hola')