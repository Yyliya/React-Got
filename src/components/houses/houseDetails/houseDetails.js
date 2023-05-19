import React, {Component} from 'react';
import './houseDetails.css';
import gotService from '../../../services/gotService'
import Spinner from '../../spinner'
import ErrorMessage from '../../error'

class HouseDetails extends Component {

    gotService = new gotService()
    state = {
        house: null,
        loading: true, 
        error: false
    }


    componentDidMount() { 
        this.updateHouse()
    }

    //Нужно делать проверку для того чтобы избежать зацикленности 
    componentDidUpdate(prevProps) {
        if (this.props.houseId !== prevProps.houseId) {
            this.updateHouse()
        }
    }

    onHouseDetailsLoading = (house) => {
        this.setState({
            house,
            loading: false
        })
    }   

    updateHouse = () => {
        const {houseId} = this.props
        if (!houseId) {
            return
        }
        this.setState({
            loading: true
        }) 
        this.onHouseDetailsLoading()
        this.gotService.getHouse(houseId)
            .then((house) => {
                this.setState({house})
            })
        //this.foo.bar = 0
    }

    onError(){
        this.setState({
            house: null,
            error: true
        })
    }


    render() {

        if (!this.state.house && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.house) {
            return <span className="select-error">Please select a house</span>
        }

        const {name, region, words, titles, ancestralWeapons} = this.state.house;

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
                        <span className="term">Region</span>
                        <span>{region}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Words</span>
                        <span>{words}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Titles</span>
                        <span>{titles}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Ancestral Weapons</span>
                        <span>{ancestralWeapons}</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default HouseDetails