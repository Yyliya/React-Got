import React, {Component} from 'react';
import HouseList from '../houseList/houseList';
import HouseDetails from '../houseDetails/houseDetails';
import {Col, Row} from 'reactstrap';
import ErrorMessage from '../../error/errorMessage'

class HousePage extends Component {
    state = {
        selectedHouse: 130,
        error: false

    }

    
    onHouseSelected = (id) => {
        this.setState({
            selectedHouse: id
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
                        <HouseList  onHouseSelected={this.onHouseSelected} />
                    </Col>
                    <Col md='6'>
                        <HouseDetails houseId={this.state.selectedHouse}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default HousePage


