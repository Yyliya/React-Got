import React, {Component} from 'react';
import './bookList.css';
import gotService from '../../../services/gotService'
import Spinner from '../../spinner'


class BookList extends Component {

    gotService = new gotService()

    state = {
        bookList: null
    }

    componentDidMount() {
        this.gotService.getAllBooks()
            .then( (bookList) => {
                this.setState({
                    bookList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            return(
                <li 
                className="list-group-item"
                key={i}
                onClick={() => this.props.onBookSelected(41 + i)}>
                    {item.name}
                </li>
            )
        })
    }
    render() {

        const {bookList} = this.state

        if(!bookList) {
            return <Spinner/>
        }
        const items = this.renderItems(bookList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

export default BookList