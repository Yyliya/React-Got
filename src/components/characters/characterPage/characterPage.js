import React, {Component} from 'react';
import CharList from '../charList';
import CharDetails from '../charDetails';
import {Col, Row} from 'reactstrap';
import ErrorMessage from '../../error/errorMessage'

export default class CharacterPage extends Component {
    state = {
        selectedChar: 130,
        error: false

    }

    
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
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
                        <CharList  onCharSelected={this.onCharSelected} />
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar}/>
                    </Col>
                </Row>
            </div>
        )
    }
}



