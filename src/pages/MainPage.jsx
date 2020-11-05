import React, { Component } from "react";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import Choosing from "./subpages/Choosing";
import Entrust from "./subpages/Entrust";
import Main from "./subpages/Main";
import Raise from "./subpages/Raise";
// import Showoff from "./subpages/Showoff";
import { user } from "../service";
import { Route } from "react-router-dom";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        user: {
          Username: "",
          ImgUrl: null,
          UID: 0,
        },
        pets: [],
        chats: [],
      },
      chatPartner: null,
    };
  }

  componentDidMount() {
    user.profile().then((profile) => this.setState({ profile }));
  }

  statechange = (state) => this.setState(state);

  render() {
    const { profile } = this.state;
    const { match } = this.props;

    return (
      <div id="main" style={{ display: "flex", height: "100%" }}>
        <SideBar {...profile} statechange={this.statechange} />

        {((page) => {
          // if (page === "choosing")
          // return (
          //   <Choosing UID={profile.user.UID} statechange={this.statechange} />
          // );
          // else if (page === "entrust")
          //   return <Entrust statechange={this.statechange} />;
          // else if (page === "raise" && eid != null)
          //   return <Raise EID={eid} statechange={this.statechange} />;
          // else if (page === "showoff")
          //   return <Showoff statechange={this.statechange} />;
          // return <Main statechange={this.statechange} />;
        })(this.state.page)}

        <Route exact path={match.url} component={Main} />
        <Route exact path={`${match.path}/entrust`} component={Entrust} />
        <Route exact path={`${match.path}/raise`} component={Choosing} />
        <Route
          exact
          path={`${match.path}/raise/:eid([0-9]+)`}
          component={Raise}
        />

        {/* {chatPartner != null ? (
          <Chat
            user={profile.user}
            partner={chatPartner}
            statechange={this.statechange}
          />
        ) : null} */}
      </div>
    );
  }
}

export default MainPage;
