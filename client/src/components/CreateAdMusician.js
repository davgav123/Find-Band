import React, { Component } from 'react';
import axios from 'axios';
import '../css/FindMBV.css';


class CreateAdMusician extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forAd: {
                title: "",
                genre: "not_selected",
                instrument: "not_selected",
                description: ""
            }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
        this.onSelectedInstrumentChange = this.onSelectedInstrumentChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }

    checkValidity(entity) {
        if (entity.title === "") {
            window.alert("Please insert title!");
            return false;
        }
        else if (entity.genre === "not_selected") {
            window.alert("Please select genre!");
            return false;
        }
        else if (entity.instrument === "not_selected") {
            window.alert("Please select instrument");
            return false;
        }
        else if (entity.description === "") {
            window.alert("Plese insert advertisement description!");
            return false;
        }

        return true;
    }

    onTitleChange(title) {
        const forAd = {
            title: title.target.value,
            genre: this.state.forAd.genre,
            instrument: this.state.forAd.instrument,
            description: this.state.forAd.description
        }
        this.setState({
            forAd
        });
    }

    onSelectedGenreChange(genre) {
        const forAd = {
            title: this.state.forAd.title,
            genre: genre.target.value,
            instrument: this.state.forAd.instrument,
            description: this.state.forAd.description
        }
        this.setState({
            forAd
        });
    }

    onSelectedInstrumentChange(instrument) {
        const forAd = {
            title: this.state.forAd.title,
            genre: this.state.forAd.genre,
            instrument: instrument.target.value,
            description: this.state.forAd.description
        }
        this.setState({
            forAd
        });
    }

    onDescriptionChange(description) {
        const forAd = {
            title: this.state.forAd.title,
            genre: this.state.forAd.genre,
            instrument: this.state.forAd.instrument,
            description: description.target.value
        }
        this.setState({
            forAd
        });
    }

    handleOnSubmit = async event => {
        let adInfo = this.state.forAd;

        let isValid = this.checkValidity(adInfo);
        if (!isValid) {
            return ;
        }

        let confirm = window.confirm("Are you sure you want to create this advertisement?");
        if (!confirm) {
            return ;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/user/get/user/data',
                { email: localStorage.email }
            );

            const {user} = response.data;

            adInfo["location"] = user.location;
        } catch (e) {
            console.log(e);
        }

        // add needed info
        adInfo["user"] = localStorage.email;
        adInfo["accountType"] = localStorage.accountType;

        try {
            await axios.post('http://localhost:5000/api/forum/createAdMusician', adInfo);
        } catch (e) {
            console.log(e);
        }

        console.log(adInfo);

        window.alert("Ad successfully created!");
        document.getElementById("form-create-ad-musician").reset();
        window.location.href = "profile/" + localStorage.accountType;
    };
    
    render() {
        return (
            <div>
                <div className="container" id="create-ad-musician" style={{ paddingTop: '70px', paddingBottom: '50px' }}>
                    <div className="row">

                        <div className="col-lg-3">
                        </div>

                        <div className="card col-lg-6">
                            <div className="card-body">

                                <h2> Advertise yourself to bands </h2>

                                <form id="form-create-ad-musician">
                                    <div className="form-group">
                                            <label htmlFor="title-musician-create-ad"> Advertisement Title: </label>
                                            <input id="title-musician-create-ad"
                                                name="title-musician-create-ad"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Title"
                                                onChange={this.onTitleChange}
                                                />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="genre-musician-create-ad"> I would like to play (genre): </label>
                                        <select id="genre-musician-create-ad" className="form-control" onChange={this.onSelectedGenreChange}>
                                            <option value="not_selected"> Select Desired Genre </option>
                                            <option value="Pop"> Pop </option>
                                            <option value="Rock"> Rock </option>
                                            <option value="Jazz"> Jazz </option>
                                            <option value="Metal"> Metal </option>
                                            <option value="Folk"> Folk </option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="instrument-musician-create-ad"> I would like to play (instrument): </label>
                                        <select id="instrument-musician-create-ad" className="form-control" onChange={this.onSelectedInstrumentChange}>
                                            <option value="not_selected"> Select Desired Instrument </option>
                                            <option value="Voice"> Voice </option>
                                            <option value="Guitar"> Guitar </option>
                                            <option value="Bass Guitar"> Bass Guitar </option>
                                            <option value="Piano"> Piano </option>
                                            <option value="Violin"> Violin </option>
                                            <option value="Drums"> Drums </option>
                                            <option value="Trumpet"> Trumpet </option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description-musician-create-ad"> Advertisement description: </label>
                                        <textarea className="form-control"
                                            id="description-musician-create-ad"
                                            rows="5"
                                            onChange={this.onDescriptionChange}></textarea>
                                    </div>

                                    <button type="button" onClick={this.handleOnSubmit} className="btn btn-success"> Create Ad </button>
                                </form>
                            </div>
                        </div>
                        
                        <div className="col-lg-3">
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateAdMusician;