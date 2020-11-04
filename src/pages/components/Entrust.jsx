import React, { Component } from "react";
import "./Entrust.scss";
import imgPlus from "../../images/plus.png";
import imgNoplus from "../../images/minus.png";
import { BASE_URL } from "../../config/url";
import { download } from "../../service/image";
class Entrust extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 전체 목록
      info: {
        Pets: [],
        Housings: [],
        Cities: [],
      },
      form: {
        Pets: [],
        Date: "",
        Housings: [],
        CityID: 0,
        Text: "",
        Toypayment: "",
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
      this.setState({ isHousingAdded: !this.state.isHousingAdded });
  };

  addForm = (name, item) => {
    var form = this.state.form;
    form[name].push(item);
    this.setState({ form: form });
  };

  removeForm = (name, item) => {
    var form = this.state.form;
    form[name].splice(form[name].indexOf(item), 1);
    this.setState({ form: form });
  };

  // 2018-03-20 ~ 2020-10-02

  submit = () => {
    const { form } = this.state;
    var date = form.Date.split("~");
    delete form.Date;
    form.HousingIDs = form.Housings.map((housing) => housing.HousingID);
    delete form.Housings;
    form.PetIDs = form.Pets.map((pet) => pet.PID);
    delete form.Pets;

    form.StartDate = date[0];
    form.EndDate = date[1];
    form.Toypayment = Number(form.Toypayment);
    form.CityID = Number(form.CityID);
    form.Preypayment = false; // Fake
    console.log(form);

    fetch(BASE_URL + "/entrust", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status) {
          this.props.statechange({ page: "main" });
          alert("Entrust completely");
        } else alert("Error");
      });
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
              {(() => {
                return info.Pets.map((pet) =>
                  form.Pets.includes(pet) ? (
                    <div
                      className="item checked"
                      key={pet.PID}
                      onClick={(e) => this.removeForm("Pets", pet)}
                    >
                      <img className="image" src={pet.ImgUrl} alt="" />
                      <div className="petname checked_name">{pet.Name}</div>
                    </div>
                  ) : (
                    <div
                      className="item"
                      key={pet.PID}
                      onClick={(e) => this.addForm("Pets", pet)}
                    >
                      <img className="image" src={pet.ImgUrl} alt="" />
                      <div className="petname">{pet.Name}</div>
                    </div>
                  )
                );
              })()}
            </div>
          </div>
          <div className="fills">
            <div className="name">Fill the under blanks</div>
            <div className="tablebox">
              <div className="name">Date</div>
              <div className="dateInput">
                <input
                  type="text"
                  name="Date"
                  onChange={this.handleChange}
                  value={form.Date}
                  placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
                />
              </div>
              <div className="name">Housing Form</div>
              <div className="housingform">
                {form.Housings.map((housing) => (
                  <div
                    className="item"
                    key={housing.HousingID}
                    onClick={(e) => this.removeForm("Housings", housing)}
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
                          onClick={(e) => {
                            this.addForm("Housings", housing);
                            this.toggleHousing(e);
                          }}
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
              <div className="name">Location</div>
              <div className="dataInput">
                <select
                  name="CityID"
                  value={form.CityID}
                  onChange={this.handleChange}
                >
                  <option value="0">city</option>
                  {info.Cities.map((city, idx) => (
                    <option key={idx} value={city.CityID}>
                      {city.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="name">Toy Payment</div>
              <div className="dateInput">
                <input
                  type="text"
                  name="Toypayment"
                  onChange={this.handleChange}
                  value={form.Toypayment}
                  placeholder="How much you want to pay for"
                />
                Won
              </div>
              <div className="name">Else</div>
              <textarea
                id="textarea"
                cols="4"
                rows="10"
                placeholder="Type something more to say"
                onChange={this.handleChange}
                name="Text"
                value={form.Text}
              ></textarea>
            </div>
          </div>
          <input
            className="submit"
            type="button"
            value="Submit"
            onClick={this.submit}
          />
        </div>
      </div>
    );
  }
}

export default Entrust;
