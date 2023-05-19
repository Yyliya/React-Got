import React, {Component} from 'react';
import './randomBook.css';
import gotService from '../../../services/gotService'
import Spinner from '../../spinner'
import ErrorMessage from '../../error/errorMessage'

class RandomBook extends Component {
    gotService = new gotService()

    state = {
        book: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateBook()
        //this.timerId = setInterval (this.updateBook, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    onBookLoaded = (book) => {
        this.setState({
            book,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    } 

    updateBook = () => {
        const id = Math.floor(Math.random()*180 +70)//диапазон от 25-140
        //const id = 13000000
        this.gotService.getBook(id)
            .then(this.onBookLoaded)
            .catch(this.onError)
    }

    render() {

        const {book, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View book={book} /> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({book}) => {
    const {name, numberOfPages, publiser, released} = book

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term"> Number of pages </span>
                    <span>{ numberOfPages}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Publiser </span>
                    <span>{publiser}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Released </span>
                    <span>{released}</span>
                </li>
            </ul>
        </>
    )
}

export default RandomBook