import React, {Component} from 'react';
import './bookDetails.css';
import gotService from '../../../services/gotService'
import Spinner from '../../spinner'
import ErrorMessage from '../../error'

 class BookDetails extends Component {

    gotService = new gotService()
    state = {
        book: null,
        loading: true, 
        error: false
    }


    componentDidMount() { 
        this.updateBook()
    }

    //Нужно делать проверку для того чтобы избежать зацикленности 
    componentDidUpdate(prevProps) {
        if (this.props.bookId !== prevProps.bookId) {
            this.updateBook()
        }
    }

    onBookDetailsLoading = (book) => {
        this.setState({
            book,
            loading: false
        })
    }   

    updateBook = () => {
        const {bookId} = this.props
        if (!bookId) {
            return
        }
        this.setState({
            loading: true
        }) 
        this.onBookDetailsLoading()
        this.gotService.getBook(bookId)
            .then((book) => {
                this.setState({book})
            })
        //this.foo.bar = 0
    }

    onError(){
        this.setState({
            book: null,
            error: true
        })
    }


    render() {

        if (!this.state.book && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.book) {
            return <span className="select-error">Please select a book</span>
        }

        const {name, numberOfPages, publiser, released} = this.state.book;

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Number of pages</span>
                        <span>{numberOfPages}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Publiser</span>
                        <span>{publiser}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Released</span>
                        <span>{released}</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default BookDetails