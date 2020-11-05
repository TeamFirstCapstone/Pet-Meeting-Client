import React, { Component } from "react";
import "./Entrust.scss";
import { entrust } from "../../service";

class Entrust extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 전체 목록
      info: {
        pets: [],
        housing: [],
        city: [],
      },
      form: {
        petIds: [],
        date: "",
        housingIds: [],
        cityId: 0,
        text: "",
        toyPayment: "",
      },

      isHousingAdded: false,
    };
  }

  componentDidMount() {
    Promise.all([entrust.info(), entrust.pets(0, 10)]).then(([info, pets]) =>
      this.setState({ info: { ...info, pets } })
    );
  }

  handleChange = (e) => {
    var { form } = this.state;
    form[e.target.name] = e.target.value;
    this.setState({ form });
  };

  toggleHousing = (e) => {
    this.setState({ isHousingAdded: !this.state.isHousingAdded });
  };

  addForm = (name, item) => {
    var { form } = this.state;
    form[name].push(item);
    this.setState({ form: form });
  };

  removeForm = (name, item) => {
    var { form } = this.state;
    form[name] = form[name].filter((v) => v !== item);
    this.setState({ form });
  };

  // 2018-03-20 ~ 2020-10-02

  submit = () => {
    console.log(this.state.form);
    const { city } = this.state.info;
    const { date, text, toyPayment } = this.state.form;
    const { cityId, housingIds, petIds } = this.state.form;
    const [startDate, endDate] = date.split("~");

    const cityOut = city.find((v) => v.Name === cityId);

    entrust
      .create({
        text,
        startDate,
        endDate,
        cityId: cityOut.CityID,
        toyPayment,
        housings: housingIds,
        pets: petIds,
      })
      .then(() => {
        alert("apply successfully");
        this.props.history.push("/main");
      })
      .catch((message) => alert(message));
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
              {info.pets.map((pet, idx) =>
                // TODO: Key 나중에 넣자
                form.petIds.includes(pet.PID) ? (
                  <Pet {...pet} choosen={true} removeForm={this.removeForm} />
                ) : (
                  <Pet {...pet} choosen={false} addForm={this.addForm} />
                )
              )}
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
                  value={form.Date}
                  placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
                />
              </div>
              <div className="name">Housing Form</div>
              <div className="housingform">
                {info.housing.map(({ HousingID, Name }) =>
                  form.housingIds.includes(HousingID) ? (
                    <div
                      className="item"
                      key={HousingID}
                      onClick={(e) => this.removeForm("housingIds", HousingID)}
                    >
                      {Name}
                    </div>
                  ) : null
                )}

                {info.housing.map(({ HousingID, Name }) => {
                  return !form.housingIds.includes(HousingID) &&
                    isHousingAdded ? (
                    <div
                      className="item blue"
                      key={HousingID}
                      onClick={(e) => {
                        this.addForm("housingIds", HousingID);
                        this.toggleHousing(e);
                      }}
                    >
                      {Name}
                    </div>
                  ) : null;
                })}
                <i
                  className={`fas fa-plus item ${isHousingAdded ? "blue" : ""}`}
                  onClick={this.toggleHousing}
                />
              </div>
              <div className="name">Location</div>
              <div className="dataInput">
                <select
                  name="cityId"
                  value={form.cityId}
                  onChange={this.handleChange}
                >
                  <option value="0">city</option>
                  {info.city.map((city, idx) => (
                    <option key={idx} value={city.cityId}>
                      {city.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="name">Toy Payment</div>
              <div className="dateInput">
                <input
                  type="text"
                  name="toyPayment"
                  onChange={this.handleChange}
                  value={form.toyPayment}
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
                name="text"
                value={form.text}
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

class Pet extends Component {
  render() {
    const { choosen } = this.props;
    const { Name, ImgUrl, PID } = this.props;
    const { removeForm, addForm } = this.props;

    if (choosen)
      return (
        <div className="item checked" onClick={() => removeForm("petIds", PID)}>
          <img className="image" src={ImgUrl} alt="" />
          <div className="petname checked_name">{Name}</div>
        </div>
      );
    else
      return (
        <div className="item" onClick={() => addForm("petIds", PID)}>
          <img className="image" src={ImgUrl} alt="" />
          <div className="petname">{Name}</div>
        </div>
      );
  }
}

export default Entrust;
