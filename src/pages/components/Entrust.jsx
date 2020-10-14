import React, { Component } from "react";
import "./Entrust.scss";
import imgPlus from "../../images/plus.png";
import imgNoplus from "../../images/minus.png";
import { BASE_URL } from "../../config/url";
import { download } from "../../services/image";

class Entrust extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 전체 목록
      info: {
        Pets: [],
        Housings: [],
      },
      form: {
        Pets: [],
        Date: "",
        Housings: [],
        Text: "",
      },

      isHousingAdded: false,
    };
  }

  componentDidMount() {
    fetch(BASE_URL + "/entrust/info")
      .then((res) => res.json())
      .then((json) => {
        Promise.all(
          json.result.Pets.map((pet) =>
            download(pet.Filename).then((url) => {
              pet.ImgUrl = url;
              return pet;
            })
          )
        ).then((pets) => {
          json.result.Pets = pets;
          console.log(json.result);
          this.setState({ info: json.result });
        });
      });
  }

  handleChange = (e) => {
    var form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form: form });
  };

  toggleHousing = (e) => {
    if (this.state.form.Housings.length !== this.state.info.Housings.length)
      this.setState({ isHousingAdded: true });
  };

  addHousing = (housing) => {
    var form = this.state.form;
    form.Housings.push(housing);
    console.log(form);
    this.setState({ form: form, isHousingAdded: false });
  };

  removeHousing = (housing) => {
    var form = this.state.form;
    form.Housings.splice(form.Housings.indexOf(housing), 1);
    this.setState({ form: form });
  };

  render() {
    const { info, form } = this.state;
    const { isHousingAdded } = this.state;
    return (
      <div id="entrust">
        <div className="title">Entrust application</div>
        <div className="formbox">
          {/* pets가 overflow 되면? */}
          <div className="pets">
            <div className="name">Choose your pet to entrust</div>
            <div className="box">
              {info.Pets.map((pet) => (
                <div className="item" key={pet.PID}>
                  <img
                    className="image"
                    style={{ backgroundImage: `url(${pet.ImgUrl})` }}
                    alt=""
                  />
                  <div className="petname">{pet.Name}</div>
                </div>
              ))}
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
                {form.Housings.map((housing) => (
                  <div
                    className="item"
                    key={housing.HousingID}
                    onClick={(e) => this.removeHousing(housing)}
                  >
                    {housing.Name}
                  </div>
                ))}

                {(() => {
                  if (isHousingAdded)
                    return info.Housings.map((housing, idx) =>
                      form.Housings.includes(housing) ? null : (
                        <div
                          className="item blue"
                          key={housing.HousingID}
                          onClick={(e) => this.addHousing(housing)}
                        >
                          {housing.Name}
                        </div>
                      )
                    );
                })()}

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
                value={form.Text}
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
