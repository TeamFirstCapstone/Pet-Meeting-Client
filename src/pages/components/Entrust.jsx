import React, { Component } from "react";
import "./Entrust.scss";
import imgPlus from "../../images/plus.png";
import imgNoplus from "../../images/minus.png";
import { BASE_URL } from "../../config/url";

class Entrust extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 전체 목록
      info: {
        pets: [],
        housings: [],
      },
      form: {
        pets: [],
        date: "",
        housings: [],
        elses: "",
      },

      isHousingAdded: false,
      isPetAdded: false,
    };
  }

  componentDidMount() {
    fetch(BASE_URL + "/info/list")
      .then((res) => res.json())
      .then((json) => this.setState({ list: json.result }));
  }

  handleChange = (e) => {
    var form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form: form });
  };

  toggleHousing = (e) => {
    if (this.state.form.housings.length !== this.state.housings.length)
      this.setState({ isHousingAdded: true });
  };
  togglePet = (e) => {
    if (this.state.form.pets.length !== this.state.pets.length)
      this.setState({ isPetAdded: true });
  };

  addHousing = (housing) => {
    var form = this.state.form;
    form.housings.push(housing);
    this.setState({ form: form, isHousingAdded: false });
  };
  removeHousing = (housing) => {
    var form = this.state.form;
    form.housings.splice(form.housings.indexOf(housing), 1);
    this.setState({ form: form });
  };

  render() {
    const { info, form } = this.state;
    const { isHousingAdded, isPetAdded } = this.state;
    return (
      <div id="entrust">
        <div className="title">Entrust application</div>
        <div className="formbox">
          <div className="pets">
            <div className="name">Choose your pet to entrust</div>
            <div className="box">
              {form.pets.map((pet) => (
                <div className="item">
                  <img
                    className="image"
                    style={{ backgroundImage: `url(${pet.ImgUrl})` }}
                    alt=""
                  />
                  <div className="petname">{pet.Name}</div>
                  <img className="noplus" src={imgNoplus} alt="" />
                </div>
              ))}
              {isPetAdded
                ? info.pets.map((pet, idx) =>
                    form.pets.includes(pet) ? null : (
                      <div className="item">
                        <img
                          className="image"
                          style={{ backgroundImage: `url(${pet.ImgUrl})` }}
                          alt=""
                        />
                        <div className="petname">{pet.Name}</div>
                        <img className="blur" src={imgNoplus} alt="" />
                      </div>
                    )
                  )
                : null}
              <div className="item plus">
                <img
                  className="image"
                  src={imgPlus}
                  alt=""
                  onClick={this.togglePet}
                />
                <div className="petname"></div>
              </div>
            </div>
          </div>
          <div className="fills">
            <div className="name">Fill the under blanks</div>
            <div className="tablebox">
              <div className="name">Date</div>
              <div className="dateInput">
                <input
                  type="text"
                  name="date"
                  onChange={this.handleChange}
                  value={form.date}
                  placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
                />
              </div>
              <div className="name">Housing Form</div>
              <div className="housingform">
                {form.housings.map((housing, idx) => (
                  <div
                    className="item"
                    key={idx}
                    onClick={(e) => this.removeHousing(housing)}
                  >
                    {housing}
                  </div>
                ))}

                {isHousingAdded
                  ? info.housings.map((housing, idx) =>
                      form.housings.includes(housing) ? null : (
                        <div
                          className="item blue"
                          key={idx}
                          onClick={(e) => this.addHousing(housing)}
                        >
                          {housing}
                        </div>
                      )
                    )
                  : null}
                <i
                  className={`fas fa-plus item ${isHousingAdded ? "blue" : ""}`}
                  onClick={this.toggleHousing}
                />
              </div>
              <div className="name">Else</div>
              <textarea
                id="textarea"
                cols="4"
                rows="10"
                placeholder="Type something more to say"
                onChange={this.handleChange}
                name="elses"
                value={form.elses}
              ></textarea>
            </div>
          </div>
          <input className="submit" type="button" value="Submit" />
        </div>
      </div>
    );
  }
}

export default Entrust;
