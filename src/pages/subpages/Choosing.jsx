import React, { Component } from "react";
import "./scss/Choosing.scss";
import "./scss/_vertical.scss";
import "./scss/chart.scss";

import { entrust } from "../../service";
import { Link } from "react-router-dom";

class Choosing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      filteringInfo: {
        housing: [],
        species: [],
        breed: [],
      },
      filteringForm: {
        housing: [],
        species: [],
        breed: [],
      },
    };
  }

  componentDidMount() {
    entrust.pets(0, 100).then((pets) => this.setState({ pets }));
    entrust.info().then((filteringInfo) => this.setState({ filteringInfo }));
  }

  toggleFilter = (e) => {
    const key = e.target.getAttribute("data-key");
    const name = e.target.getAttribute("name");

    var { filteringForm } = this.state;
    var attr = filteringForm[name];
    if (attr.includes(key)) attr.splice(attr.indexOf(key), 1);
    else attr.push(key);
    filteringForm[name] = attr;

    this.setState({ filteringForm });
    e.target.classList.toggle("clicked");
  };

  isMatchedWithFilter = (pet) => {
    const { breed, species, housing } = this.state.filteringForm;

    if (pet.UID === this.props.UID) return false;
    if (breed.length && !breed.includes(pet.Breed)) return false;
    if (species.length && !species.includes(pet.Species)) return false;
    if (housing.length) {
      for (const h of housing) if (pet.Housing.includes(Number(h))) return true;
      return false;
    } else return true;
  };

  render() {
    const { pets, filteringInfo } = this.state;
    return (
      <div id="choosing_page">
        <div id="showing_block">
          <div className="head">
            <h1>Choose and keep pets!</h1>
          </div>

          <div id="pet_cards_list">
            {pets.map((pet, index) =>
              this.isMatchedWithFilter(pet) ? (
                <Pet {...pet} index={index} key={index} />
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
                      {filteringInfo.housing.map((housing) => (
                        <li
                          onClick={this.toggleFilter}
                          name="housing"
                          key={housing.HousingID}
                          data-key={housing.HousingID}
                        >
                          {housing.Name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <li>{">"} Type of pets</li>
                  <div className="filter_contents">
                    <ul>
                      {filteringInfo.species.map((species) => (
                        <li
                          onClick={this.toggleFilter}
                          name="species"
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
                        {filteringInfo.breed.map((breed) => (
                          <li
                            onClick={this.toggleFilter}
                            name="breed"
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

class Pet extends Component {
  render() {
    const { EID, ImgUrl, Name, Year, Breed, Description } = this.props;
    return (
      <div className="petCard">
        <div className="pet_main_info">
          <div className="box">
            <img className="profileImg" src={ImgUrl} alt="" />

            <div className="name">{Name}</div>
            <div className="yeargender">
              <div className="year">{Year} years old</div>
              <div className="gender"></div>
            </div>
            <div className="species">{Breed}</div>
          </div>
        </div>

        <div className="pet_desc_bnt">
          <div className="description">{Description}</div>
          <div className="btn_apply">
            <Link to={`/main/raise/${EID}`} className="btn btn-6">
              Apply to raise
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Choosing;
