import React, { Component } from "react";
import "./Main.scss";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import { getWorries } from "../services/profile";

class MainPage extends Component {
  constructor(props) {
    super();

    // 로그인 여부를 확인해야 한다..
  }

  render() {
    return (
      <div id="main">
        <SideBar />
        <main>
          <div className="entrustBox">
            <div className="button">
              <Link to="/entrust">Entrust your pet trustly!!</Link>
            </div>
            <div className="button">
              <Link to="/raise">Want to keep a pet?</Link>
            </div>
          </div>
          <div className="worries">
            <div className="menu">
              <div className="title">Worries</div>
              <i className="fas fa-plus"></i>
            </div>
            <div className="main">
              <div className="item">
                <div className="text">
                  afdsoasfafsda adsfnsaipfnsa pfnsai fn isadnfisna in
                  pfsafsdafjdasdfjsadjposdjapofjapogjwapoignpwiasknadnspfnegniwogbip
                </div>
                <div className="author">lnsfad</div>
              </div>
              <div className="item">
                <div className="text">afdsoasdfasdfsafjd</div>
                <div className="author">lnsfaasfdfsfd</div>
              </div>
              <div className="item">
                <div className="text">afdsojasdfsadfd</div>
                <div className="author">lnsfad</div>
              </div>
              <div className="item">
                <div className="text">afdsojqjtejad</div>
                <div className="author">lnsfad</div>
              </div>
              {/** 여기다가 for문 돌려야 한다.*/}
            </div>
          </div>
          <div className="showoff">
            <div className="menu">
              <div className="title">Show off your pets</div>
              <i class="fas fa-plus"></i>
            </div>
            <div className="main">
              <div className="thumbnail">
                <div
                  className="img"
                  style={{
                    backgroundImage:
                      "url(https://i.picsum.photos/id/112/300/300.jpg?hmac=y4hDL5pLR28SnzKfKdmo_YfoNGpMGheIutNh7X2YRbU)",
                  }}
                ></div>
              </div>
              <div className="textbox">
                <div className="text">
                  asfasffasfsda oiasdfipsaioa pfasdfsdasdfsafdsaffipsai
                  <br />
                  oapfasdfsdfipsaioapfafsadfdsafssdfsdfipsaasfsadfasfsdafsadfsaioapfasdfsdfipsaioapfasdfsdfipsaioapfasdfsfdans
                </div>
              </div>

              {/** 여기다가 for문 돌려야 한다.*/}
            </div>
            <div className="ago">4 month ago</div>
          </div>
        </main>
      </div>
    );
  }
}

export default MainPage;
