import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../characters/randomChar';
import ErrorMessage from '../error/errorMessage'
import CharacterPage from '../characters/characterPage'

import './app.css'
export default class App extends Component  {
    state = {
        //error: false, 
        showChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error')
        this.setState({
            error: true
        })
    }

    onToggleChar = () => {
        this.setState((state) => {
            return {
                showChar: !state.showChar
            }
        })
    }

    render(){
        const char = this.state.showChar ? <RandomChar/> : null
        
    if (this.state.error) {
        return <ErrorMessage/>
    } 


    return (
        <> 
            <Container>
                <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button className="randomChar"
                            onClick={this.onToggleChar}>
                            Toggle random character
                        </button>
                        </Col>
                        
                    </Row>
                </Container>
                <CharacterPage/>
            </>
        );
    };
}
