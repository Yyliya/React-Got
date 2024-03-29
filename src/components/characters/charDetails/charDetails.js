import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../../services/gotService'
import Spinner from '../../spinner'
import ErrorMessage from '../../error'

 class CharDetails extends Component {

    gotService = new gotService()
    state = {
        char: null,
        loading: true, 
        error: false
    }


    componentDidMount() { 
        this.updateChar()
    }

    //Нужно делать проверку для того чтобы избежать зацикленности 
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    onCharDetailsLoading = (char) => {
        this.setState({
            char,
            loading: false
        })
    }   

    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
            return
        }
        this.setState({
            loading: true
        }) 
        this.onCharDetailsLoading()
        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })
        //this.foo.bar = 0
    }

    onError(){
        this.setState({
            char: null,
            error: true
        })
    }


    render() {

        if (!this.state.char && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.char) {
            return <span className="select-error">Please select a character</span>
        }

        const {name, gender, born, died, culture} = this.state.char;

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
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CharDetails