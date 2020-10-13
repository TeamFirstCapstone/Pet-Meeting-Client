import React, { Component } from "react";
import "./Choosing.scss";
import { BASE_URL } from "../../config/url";
import { download } from "../../services/image";

class Choosing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
    };
  }

  componentDidMount() {
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
  }
  render() {
    const { pets } = this.state;
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

                  <div id="ratio">
                    <div className="charts charts--vertical">
                      <div className="charts__chart chart--p40 chart--red">
                        {/* <!-- <span className="charts__percent"></span> --> */}
                      </div>
                      {/* <!-- /.charts__chart --> */}
                    </div>
                    <div className="ratio_text">ratio</div>
                  </div>
                </div>

                <div id="pet_desc_bnt">
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
                  <li>{">"} Type of pets</li>
                  <div className="filter_contents">
                    <ul>
                      <li>cat</li>
                      <li>dog</li>
                      <li>tiger</li>
                      <li>iguana</li>
                    </ul>
                  </div>

                  <li>{">"} Housing form</li>
                  <li>{">"} Money</li>
                </ul>
              </div>
            </div>
            <div className="advanced_fiiltering">
              <div className="adv_filter_head">Advanced Filtering</div>
              <div className="adv_filter_list">
                <ul>
                  <li>
                    {" "}
                    {">"} Type of cats
                    <div className="adv_filter_contents">
                      <ul>
                        <li>Singapura</li>
                        <li>Persian</li>
                        <li>American Shorthair</li>
                        <li>Scottish Fold</li>
                        <li>Sphynx</li>
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
