import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckGenres from './CheckGenres';
import CheckInstruments from './CheckInstruments';
import CheckLocation from './CheckLocation';
import '../css/FindMBV.css';
import '../css/Musicians.css';
import axios from 'axios';

class Bands extends Component {

    constructor(props){
        super(props);
        this.state = {
            result: [],
            listResult: null
        }
        this.applyFilter = this.applyFilter.bind(this);
    }

    async componentDidMount() {
    
        await axios.get('http://localhost:5000/api/forum/getBands', {
            params: {
                accountType: localStorage.accountType
            }
        }).then(res => {
            console.log(localStorage.accountType)
            this.state.result = res.data;
        });
    
        this.forceUpdate();
    }


    async applyFilter(event) {
        var checkedGenres = [];
        var checkedInstruments = [];
        let checkedLocation;
        var genres = document.getElementsByClassName('genres');
        var instruments = document.getElementsByClassName('instruments');
        let location = document.getElementById('location');

        for (let i = 0; genres[i]; ++i) {
            // console.log(inputElements)
            if (genres[i].checked) {
                checkedGenres.push(genres[i].value);

            }
        }

        for (let i = 0; instruments[i]; ++i) {
            if (instruments[i].checked) {
                console.log(instruments[i].value)
                checkedInstruments.push(instruments[i].value);

            }
        }
        checkedLocation = location.value;
        
        await axios.get('http://localhost:5000/api/forum/getBandsFilter', {
            params: {
                accountType: localStorage.accountType,
                instrument: checkedInstruments,
                genre: checkedGenres,
                location: checkedLocation
            }
        }).then(res => {
            console.log(localStorage.accountType)
            this.state.result = res.data;
        });
        

        this.forceUpdate();
    }

    viewAd(email) {
        localStorage.setItem("contactEmail", email);
        window.location.href = "/ContactForm";
    }

    viewProfile(email) {
        localStorage.setItem("contactEmail", email);
        window.location.href = "/profile/band";
    }

    render() {
        const style = {
            borderRadius: "25px",
            borderStyle: "solid",
            borderColor: "#343a40",
            height: "40%",
            margin: "3%",
            backgroundColor: "rgba(4,4,4, 0.7)"
        };
        const styleItems = {
            marginLeft: "20px",
            color: "white"
        };

        const styleButtonsDiv = {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            justifyContent: "flex-end",
            padding: "2%"
            
        };
        
        let adsArray = [];
        for (let e of this.state.result) {
            console.log(e.title);
            adsArray.push(<div style={style}>
                <div style={{ marginTop: "20px" }}>
                    <h2 style={styleItems}>{e.title}</h2>
                    <h5 style={styleItems}>Description: {e.description}</h5>
                    <h6 style={styleItems}>Genre: {e.genre}</h6>
                    <h6 style={styleItems}>Instrument: {e.instrument}</h6>
                    <h6 style={styleItems}>Location: {e.location}</h6>
                    <h6 style={styleItems}>Email: {e.user}</h6>
                    <div className="buttonsDiv" style={styleButtonsDiv}>
                        <button className="btn btn-success" id="styleButton" style={{marginLeft: "15px", height: "50%"}} onClick={() => this.viewAd(e.user)}> Contact    
                        </button>
                        <span> </span>
                        <button className="btn btn-success" id="styleButtonViewProfile" style={{marginLeft: "15px", height: "50%"}} onClick={() => this.viewProfile(e.user)}>
                        View profile
                        </button>
                    </div>
                </div>

            </div>);
        }

        return(
            <div>
                <Header />
                <div id="boxesBand"> 
                    {/* <img src="/backgrounds/guitarBlur.jpg" alt="image_background" id="imageBcg"/> */}
                    <div className="container" id="left">
                        <CheckGenres /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckInstruments />
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckLocation /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <button id="button2" style={{backgroundColor: "#343a40"}} onClick={this.applyFilter}>
                            <span>Apply</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="container" id="containerList">
                        <div>
                            {adsArray}
                        </div>
                    </div>
                </div>
                 <Footer />
            </div>
        );
    }

}


export default Bands;