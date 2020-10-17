import React, { Component } from "react";
import { BASE_URL } from "../../config/url";
import "./Raise.scss";

class Raise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        Housings: [],
        Cities: [],
      },
      form: {
        sex: "",
        age: "",
        Housing: [],
        CarrierPeriod: "",
        Motivation: "",
        City: "",
      },
    };
  }

  componentDidMount() {
    fetch(BASE_URL + "/entrust/info")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.result);
        this.setState({ info: json.result });
      });
  }

  handleChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    var form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form: form });
  };

  submit = () => {
    var { form, info } = this.state;

    form.sex = form.sex === "Man" ? 1 : 2; // sex
    form.age = Number(form.age);
    form.CarrierPeriod = Number(form.CarrierPeriod);

    // Housing
    info.Housings.forEach((housing) => {
      if (form.Housing === housing.Name) form.HousingID = housing.HousingID;
    });
    delete form.Housing;

    // City
    info.Cities.forEach((city) => {
      if (form.City === city.Name) form.CityID = city.CityID;
    });
    delete form.City;

    form.EID = this.props.EID;

    console.log(form);
    fetch(BASE_URL + "/entrust/raise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) this.props.statechange({ page: "main", eid: null });
      });
  };

  render() {
    const { info, form } = this.state;
    return (
      <div id="raise">
        <h1 className="centerTitle">Raising application</h1>
        <h1 className="tt">You can show your own image to the owner</h1>

        <form>
          <fieldset>
            <lengend>
              personal information(not mandatory)
              <div className="row1">
                <div className="sex">sex</div>

                <input
                  type="text"
                  name="sex"
                  list="sexList"
                  onChange={this.handleChange}
                />
                <datalist id="sexList">
                  <option value="Man"></option>
                  <option value="Woman"></option>
                </datalist>
              </div>
              <div className="row1">
                <div className="age">age</div>

                <input
                  type="number"
                  name="age"
                  className="ageText"
                  min="7"
                  max="90"
                  onChange={this.handleChange}
                />
              </div>
            </lengend>
          </fieldset>
        </form>
        <h2 className="tt2">Sitter Information</h2>

        <div className="row3">
          <div className="Housing Form">Housing form</div>

          <input
            type="text"
            name="Housing"
            list="housingFormList"
            onChange={this.handleChange}
          />
          <datalist id="housingFormList">
            {info.Housings.map((housing, idx) => (
              <option value={housing.Name} key={idx}></option>
            ))}
          </datalist>
        </div>

        <div></div>

        <div className="row2">
          <div className="Seating InFormation">Seating experience</div>
          <div></div>
          <input
            type="number"
            className="SeatingCount"
            min="0"
            max="30"
            name="CarrierPeriod"
            onChange={this.handleChange}
          />
          <div className="times">times</div>
        </div>

        <div className="row3">
          <div className="Housing Form">Location</div>
          <div></div>
          <div className="HousingFormComboBox">
            <input
              type="text"
              name="City"
              list="locationList"
              onChange={this.handleChange}
            />
            <datalist id="locationList">
              {info.Cities.map((city, idx) => (
                <option value={city.Name} key={idx}></option>
              ))}
            </datalist>
          </div>
        </div>

        <div className="row4">
          <div className="Form">motivation</div>
          <div></div>

          <textarea
            className="Text3"
            name="Motivation"
            onChange={this.handleChange}
          ></textarea>
        </div>
        <input type="button" value="submit" onClick={this.submit} />
        <h1 className="title1">
          Motivation text will be delivered to pet owner
        </h1>
      </div>
    );
  }
}

export default Raise;
