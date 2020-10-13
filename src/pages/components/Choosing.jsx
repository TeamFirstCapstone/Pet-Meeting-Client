import React, { Component } from "react";
import "./Choosing.scss";
import { BASE_URL } from "../../config/url";
import { download } from "../../services/image";

class Choosing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
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
      .then((json) => this.setState({ filtering: json.result }));
  }
  render() {
    const { pets, filtering } = this.state;
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
            {pets.map((pet, idx) => (
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
                      <div className="charts__chart chart--p40 chart--red">
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
                    <button className="btn btn-6">Apply to entrust</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="list">
            <div className="filtering">
              <div className="filter_head">Filtering</div>
              <div className="filter_list">
                <ul>
                  <li>{">"} Housing form</li>
                  <div className="filter_contents">
                    <ul>
                      {filtering.Housing.map((housing) => (
                        <li key={housing.HousingID}> {housing.Name}</li>
                      ))}
                    </ul>
                  </div>

                  <li>{">"} Type of pets</li>
                  <div className="filter_contents">
                    <ul>
                      {filtering.Species.map((species) => (
                        <li key={species.SpeciesID}> {species.Name}</li>
                      ))}
                    </ul>
                  </div>
                  {/* <li>{">"} Money </li> */}
                </ul>
              </div>
            </div>
            <div className="advanced_fiiltering">
              <div className="adv_filter_head">Advanced Filtering</div>
              <div className="adv_filter_list">
                <ul>
                  <li>
                    {">"} Type of cats
                    <div className="adv_filter_contents">
                      <ul>
                        {filtering.Breed.map((breed) => (
                          <li key={breed.BreedID}> {breed.Name}</li>
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
