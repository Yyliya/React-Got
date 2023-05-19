import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';

import BookList from '../bookList/bookList';
import BookDetails from '../bookDetails/bookDetails'
import ErrorMessage from '../../error/errorMessage'

class BookPage extends Component {
    state = {
        selectedBook: 130,
        error: false

    }

    
    onBookSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    componentDidCatch() {
        console.log('error')
        this.setState({
            error: true
        })
    }

    render() {
                
    if (this.state.error) {
        return <ErrorMessage/>
    } 
        return (
            <div>
                <Row>
                    <Col md='6'>
                        <BookList  onBookSelected={this.onBookSelected} />
                    </Col>
                    <Col md='6'>
                        <BookDetails bookId={this.state.selectedBook}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BookPage