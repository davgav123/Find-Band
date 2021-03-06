import React, { Component } from 'react';

class ListResult extends Component{

    constructor(props){
        super(props)

    }

    viewProfile(id){
        console.log(id);
    }
    apply(id){
        console.log(id);
    }


    render(){
        const style={
                borderRadius: "25px", 
                borderStyle: "solid", 
                borderColor: "#343a40", 
                height: "40%", 
                margin: "3%",
                backgroundColor: "rgba(4,4,4, 0.7)"
            };
            const styleItems={
                marginLeft: "20px", 
                color: "white"
            };

            const styleButton={
                colorborder: "1px solid rgb(70, 171, 230)",
                marginLeft: "75%", 
                backgroundColor: "#343a40",
                textAlign: "center",
                padding: "1%",
                width: "20%"
            };

        return(
            <div style = {style}>
                <div style={{marginTop: "20px"}}>
                    <h2 style={styleItems}>{this.props.name}</h2>
                    <h5 style={styleItems}>Description: {this.props.description}</h5>
                    <h6 style={styleItems}>Genre: {this.props.genre}</h6>
                    <h6 style={styleItems}>Instruments: {this.props.instruments}</h6>
                    <h6 style={styleItems}>Email: {this.props.email}</h6>
                </div>

            </div>
        );
    }

}

export default ListResult;