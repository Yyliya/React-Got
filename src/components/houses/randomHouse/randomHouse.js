import React, {Component} from 'react';
import './randomHouse.css';
import gotService from '../../../services/gotService'
import Spinner from '../../spinner'
import ErrorMessage from '../../error/errorMessage'

 class RandomHouse extends Component {
    gotService = new gotService()

    state = {
        house: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateHouse()
        //this.timerId = setInterval (this.updateHouse, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    onHouseLoaded = (house) => {
        this.setState({
            house,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    } 
    updateHouse = () => {
        const id = Math.floor(Math.random()*180 +70)//диапазон от 25-140
        //const id = 13000000
        this.gotService.getHouse(id)
        .then(this.onHouseLoaded)
        .catch(this.onError)
    }
    render() {

        const {house, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View house={house} /> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({house}) => {
    const {name, region, words, titles, ancestralWeapons} = house
    
    return (
        <>
            <h4>Random House: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Region </span>
                    <span>{region}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Words </span>
                    <span>{words}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Titles </span>
                    <span>{titles}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Ancestral Weapons </span>
                        <span>{ancestralWeapons}</span>
                    </li>
            </ul>
        </>
    )
}

export default RandomHouse;
