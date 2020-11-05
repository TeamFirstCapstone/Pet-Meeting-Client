import React, { Component } from "react";
import { BASE_URL } from "../../config/url";
import { entrust, raise } from "../../service";
import "./Raise.scss";

class Raise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        species: [],
        breed: [],
        city: [],
        housing: [],
        gender: [],
      },
      form: {
        sex: "",
        age: "",
        housing: [],
        carrierPeriod: "",
        motivation: "",
        city: "",
      },
    };
  }

  componentDidMount() {
    entrust
      .info()
      .then(({ species, breed, city, housing, gender }) =>
        this.setState({ info: { species, breed, city, housing, gender } })
      );
  }

  handleChange = (e) => {
    var form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form: form });
  };

  submit = () => {
    const { eid } = this.props.match.params;
    const { form, info } = this.state;
    const { housing, carrierPeriod, motivation, city } = form;

    if (!housing || !carrierPeriod || !motivation || !city) {
      alert("Fill all the blanks!!");
      return;
    }

    const cityId = info.city.find((v) => v.Name === city).CityID;
    const housingId = info.housing.find((v) => v.Name === housing).HousingID;

    raise
      .create({ motivation, carrierPeriod, housingId, eid, cityId })
      .then(() => {
        alert("apply successfully!");
        this.props.history.push("/main");
      })
      .catch((message) => {
        alert("Something Error");
        console.log(message);
      });
  };

  render() {
    const { info } = this.state;
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
            name="housing"
            list="housingFormList"
            onChange={this.handleChange}
          />
          <datalist id="housingFormList">
            {info.housing.map((housing, idx) => (
              <option value={housing.Name} key={idx} />
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
            name="carrierPeriod"
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
              name="city"
              list="locationList"
              onChange={this.handleChange}
            />
            <datalist id="locationList">
              {info.city.map((city, idx) => (
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
            name="motivation"
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
