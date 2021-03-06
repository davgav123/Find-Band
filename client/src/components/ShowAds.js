import React, { Component } from 'react';
import axios from 'axios';
import ListMyAds from './ListMyAds';
import Header from './Header';
import Footer from './Footer';
import '../css/Musicians.css';
import '../css/FindMBV.css';

class showAds extends Component {
  
	constructor(props) {
		super(props);
		this.state = {
			flag: false,
			result: [],
			listResult: null
		};
	}

	async componentDidMount() {
		// if (localStorage.email !== undefined) {
		// 	document.getElementById("loginButton").style.display = "none";
		// 	document.getElementById("registerButton").style.display = "none";
		// }
		// else {

        // }
        
        await axios.get('http://localhost:5000/api/forum/getAllAds', {
				params: {
					accountType: localStorage.accountType
				}
			}).then(res => {
				console.log(localStorage.accountType)
				this.state.result = res.data;
				console.log(this.state.result);
				this.state.listResult = this.state.result.map(
					result => <ListMyAds
						// id={result.id}
						// key={result.id}
						name={result.title}
						description={result.description}
						email={result.user}
						genre={result.genre}
						instrument={result.instrument}
						type={result.type}
						location={result.location}
					/>);
            })
            this.forceUpdate();
	}

	contact(email) {
		localStorage.setItem("contactEmail", email);
		window.location.href = "/ContactForm";
	}

	viewProfile(email, accountType) {
		localStorage.setItem("contactEmail", email);
		window.location.href = "/profile/" + accountType;
	}

	render(){
        const styleList={
            position: "relative",
            width: "70%",
            margin: "auto",
            marginTop: "0",
			marginBottom: "0",
			paddingTop: "10%",
			paddingBottom: "10%"
		}
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

		const styleShowAds = {
			backgroundImage: "url('/backgrounds/showAdsBcgBlur.jpg')",
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
			if (e.accountType !== "tavern") {
			adsArray.push(<div style={style}>
				<div style={{ marginTop: "20px" }}>
					<h2 style={styleItems}>{e.title}</h2>
					<h5 style={styleItems}>Description: {e.description}</h5>
					<h6 style={styleItems}>Genre: {e.genre}</h6>
					<h6 style={styleItems}>Instrument: {e.instrument}</h6>
					<h6 style={styleItems}>Location: {e.location}</h6>
					<h6 style={styleItems}>Email: {e.user}</h6>
					<div className="buttonsDiv" style={styleButtonsDiv}>
						<button className="btn btn-success" id="styleButton" style={{marginLeft: "15px", height: "50%"}} onClick={() => this.contact(e.user)}> Contact
                        </button>
						<span> </span>
						<button className="btn btn-success" id="styleButtonViewProfile" style={{marginLeft: "15px", height: "50%"}} onClick={() => this.viewProfile(e.user, e.accountType)}>
							View profile
                        </button>
					</div>
				</div>
				</div>);
			} else {
				adsArray.push(<div style={style}>
					<div style={{ marginTop: "20px" }}>
					<h2 style={styleItems}>{e.title}</h2>
					<h5 style={styleItems}>Description: {e.description}</h5>
					<h6 style={styleItems}>Genre: {e.genre}</h6>
					<h6 style={styleItems}>Type: {e.type}</h6>
					<h6 style={styleItems}>Location: {e.location}</h6>
					<h6 style={styleItems}>Email: {e.user}</h6>
					<div className="buttonsDiv" style={styleButtonsDiv}>
							<button className="btn btn-success" id="styleButton" style={{ marginLeft: "15px", height: "50%" }} onClick={() => this.viewAd(e.user)}> Contact
                        </button>
						<span> </span>
							<button className="btn btn-success" id="styleButtonViewProfile" style={{ marginLeft: "15px", height: "50%" }} onClick={() => this.viewProfile(e.user, e.accountType)}>
							View profile
                        </button>
					</div>
				</div>
				</div>);
			}
		}

		return (
			<div className="showAds" style={styleShowAds}>
                <Header />
                <div style={styleList}>
					{adsArray}
                </div>
                <Footer />
            </div>
				
		);
	}
}

export default showAds;