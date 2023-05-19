import React, {Component} from 'react';
import './houseList.css';
import gotService from '../../../services/gotService'
import Spinner from '../../spinner'


class HouseList extends Component {

    gotService = new gotService()

    state = {
        houseList: null
    }

    componentDidMount() {
        this.gotService.getAllHouses()
            .then( (houseList) => {
                this.setState({
                    houseList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            return(
                <li 
                className="list-group-item"
                key={i}
                onClick={() => this.props.onHouseSelected(41 + i)}>
                    {item.name}
                </li>
            )
        })
    }
    render() {

        const {houseList} = this.state

        if(!houseList) {
            return <Spinner/>
        }
        const items = this.renderItems(houseList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

export default HouseList