import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import ErrorMessage from '../error/errorMessage'

import RandomChar from '../characters/randomChar/randomChar';
import CharacterPage from '../characters/characterPage/characterPage';
import RandomHouse from '../houses/randomHouse/randomHouse';
import HousePage from '../houses/housesPage/housesPage';
import RandomBook from '../books/randomBook/randomBook';
import BookPage from '../books/bookPage/bookPage';

import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import './app.css'


class App extends Component  {
    state = {
        //error: false, 
        showChar: true,
        error: false,
        showHouse: true,
        showBook: true
    }

    componentDidCatch() {
        console.log('error')
        this.setState({
            error: true
        })
    }

    onToggle = () => {
        this.setState((state) => {
            return {
                showChar: !state.showChar,
                showHouse: !state.showHouse,
                showBook: !state.showBook
            }
        })
    }

    render(){
        const char = this.state.showChar ? <RandomChar/> : null
        const house = this.state.showHouse ? <RandomHouse/> : null
        const book = this.state.showBook ? <RandomBook/> : null
        
    if (this.state.error) {
        return <ErrorMessage/>
    } 


    return (
        <> 
            <Router>
                <Routes>
                    <Route path='/' element={
                        <>
                            <Container>
                                <Header/>
                            </Container>
                                <Container>
                                    <Row>
                                        <Col lg={{size: 5, offset: 0}}>
                                            {char}
                                            <button className="randomChar"
                                            onClick={this.onToggle.showChar}>
                                            Toggle random character
                                        </button>
                                        </Col>
                                    </Row>
                            </Container>
                            <CharacterPage/>
                        </>
                        }>
                    </Route>

                    <Route path='house' element={
                        <>
                        <Container>
                            <Header/>
                        </Container>
                            <Container>
                                <Row>
                                    <Col lg={{size: 5, offset: 0}}>
                                        {house}
                                        <button className="randomChar"
                                        onClick={this.onToggle.showHouse}>
                                        Toggle random house
                                    </button>
                                    </Col>
                                </Row>
                            </Container>
                            <HousePage/>
                        </>
                    }></Route>

                    <Route path='book' element={
                        <>
                            <Container>
                                <Header/>
                            </Container>
                                <Container>
                                    <Row>
                                        <Col lg={{size: 5, offset: 0}}>
                                            {book}
                                            <button className="randomChar"
                                            onClick={this.onToggle.showBook}>
                                            Toggle random book
                                        </button>
                                        </Col>
                                    </Row>
                            </Container>
                            <BookPage/>
                        </>
                        }>
                    </Route>

                </Routes>
            </Router>
            </>
        );
    };
}

export default App
