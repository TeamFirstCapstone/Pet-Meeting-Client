import React, { Component } from "react";
import "./Choosing.scss";
import "./_vertical.scss";
import "./chart.scss";

import { BASE_URL } from "../../config/url";
import { download } from "../../services/image";
class Choosing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      filteringInfo: {
        Housing: [],
        Species: [],
        Breed: [],
      },
      filtering: {
        Housing: [],
        Species: [],
        Breed: [],
      },
    };
  }

  componentDidMount() {
    // List of entrustable pet
    fetch(BASE_URL + "/entrust/pet")
      .then((res) => res.json())
      .then((json) => {
        // Error 뜬다.
        const pets = json.result;

        Promise.all(
          pets.map((pet) =>
            download(pet.Filename).then((ImgUrl) => {
              pet.ImgUrl = ImgUrl;
              return pet;
            })
          )
        ).then((pets) => this.setState({ pets: pets }));
      });

    // List of filtering
    fetch(BASE_URL + "/info/list")
      .then((res) => res.json())
      .then((json) => this.setState({ filteringInfo: json.result }));
  }

  toggleFilter = (e) => {
    const key = e.target.getAttribute("data-key");
    const name = e.target.getAttribute("name");

    var filtering = this.state.filtering;
    var attr = filtering[name];
    if (attr.includes(key)) attr.splice(attr.indexOf(key), 1);
    else attr.push(key);

    this.setState({ filtering: filtering });
    e.target.classList.toggle("clicked");
  };

  isMatchedWithFilter = (pet) => {
    // TODO. Housing Filtering은 던진다..!
    const { Breed, Species } = this.state.filtering;

    if (Breed.length && !Breed.includes(pet.Breed)) return false;
    if (Species.length && !Species.includes(pet.Species)) return false;

    return true;
  };

  entrust = (pet) => {
    this.props.statechange({
      entrustingPet: pet,
      page: "raise",
    });
  };

  render() {
    const { pets, filteringInfo } = this.state;
    return (
      <div id="choosing_page">
        {/* <!-- <div className="head">
              <h1>Choose and keep pets!</h1>
            </div> --> */}

        <div id="showing_block">
          <div className="head">
            <h1>Choose and keep pets!</h1>
          </div>

          <div id="pet_cards_list">
            {pets.map((pet, idx) =>
              this.isMatchedWithFilter(pet) ? (
                <div className="petCard" key={idx}>
                  <div className="pet_main_info">
                    <div className="box">
                      <img className="profileImg" src={pet.ImgUrl} alt="" />

                      <div className="name">{pet.Name}</div>
                      <div className="yeargender">
                        <div className="year">{pet.Year} years old</div>
                        <div className="gender"></div>
                      </div>
                      <div className="species">{pet.Breed}</div>
                    </div>

                    <div className="ratio">
                      <div className="charts charts--vertical">
                        <div className="charts__chart chart--p20 chart--red">
                          {/* <!-- <span className="charts__percent"></span> --> */}
                        </div>
                        {/* <!-- /.charts__chart --> */}
                      </div>
                      <div className="ratio_text">ratio</div>
                    </div>
                  </div>

                  <div className="pet_desc_bnt">
                    <div className="description">{pet.Description}</div>
                    <div className="btn_apply">
                      <button
                        className="btn btn-6"
                        onClick={(e) => this.entrust(pet)}
                      >
                        Apply to entrust
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
          <div className="list">
            <div className="filtering">
              <div className="filter_head">Filtering</div>
              <div className="filter_list">
                <ul>
                  <li>{">"} Housing form</li>
                  <div className="filter_contents">
                    <ul>
                      {filteringInfo.Housing.map((housing) => (
                        <li
                          onClick={this.toggleFilter}
                          name="Housing"
                          key={housing.HousingID}
                          data-key={housing.Name}
                        >
                          {housing.Name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <li>{">"} Type of pets</li>
                  <div className="filter_contents">
                    <ul>
                      {filteringInfo.Species.map((species) => (
                        <li
                          onClick={this.toggleFilter}
                          name="Species"
                          key={species.SpeciesID}
                          data-key={species.Name}
                        >
                          {species.Name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ul>
              </div>
            </div>
            <div className="advanced_filtering">
              <div className="adv_filter_head">Advanced Filtering</div>
              <div className="adv_filter_list">
                <ul>
                  <li>
                    {">"} Type of cats
                    <div className="adv_filter_contents">
                      <ul>
                        {filteringInfo.Breed.map((breed) => (
                          <li
                            onClick={this.toggleFilter}
                            name="Breed"
                            key={breed.BreedID}
                            data-key={breed.Name}
                          >
                            {breed.Name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Choosing;
