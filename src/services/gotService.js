export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    async getAllBooks() {
        const res =  await this.getResource(`/books/`);
        return res.map(this._transformBook)
    }
    
    async getBook(id) {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book)
    }
    
    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter.bind(this))
    }
    
    async getCharacter (id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character)
    }
    
    async getAllHouses() {
        const res =  await this.getResource(`/houses/`);
        return res.map(this._transformHouses)
    }
    
    async getHouse(id) {
        const house =  await this.getResource(`/houses/${id}/`);
        return this._transformHouses(house)
    }

    isSet = (data) => {
        if (data) {
            return data
        }else {
            return 'no data'
        }
    } 

    isCult = (cult) => {
        if (cult) {
            return cult
        }else {
            return 'unknown'
        }
    }

    _transformCharacter(char) {
        return {
            name: this.isSet(char.name), 
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),           
            died: this.isSet(char.died), 
            culture: this.isCult(char.culture)
        }
    }

    _transformHouses(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}