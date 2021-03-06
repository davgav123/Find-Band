import React, { Component } from 'react';

class ChekGenres extends Component {

    constructor(props) {
        super(props);
        this.state={
            isPub: false,
            isRestaurant: false,
            isNightclub: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, checked} = event.target;
        this.setState({
            [name]: checked
        })
    }

    render() {
        return (
            <div style={{color: "white"}}>
                <p style={{fontWeight: "bold", fontSize:"20px"}}>Types:</p>
                <label>
                    <input 
                        className="types"
                        type="checkbox"
                        name="isPub"
                        value="Pub"
                        checked={this.state.isPub}
                        onChange={this.handleChange}
                    /> Pub 
                </label>
                <br/>
                <label>
                    <input 
                        className="types"
                        type="checkbox"
                        name="isRestaurant"
                        value="Restaurant"
                        checked={this.state.isRestaurant}
                        onChange={this.handleChange}
                    /> Restaurant
                </label>
                <br/>
                <label>
                    <input 
                        className="types"
                        type="checkbox"
                        name="isNightclub"
                        value="Night Club"
                        checked={this.state.isNightclub}
                        onChange={this.handleChange}
                    /> Night club 
                </label>
                <br/>
                
            </div>
        );
    }
}

export default ChekGenres;