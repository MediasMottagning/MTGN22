import React, { Component } from "react";
//import { Link, Redirect } from "react-router-dom";
import "./Navigation.css";
import Frack from './../Frack';


class Navigation extends Component {
  state = { navOpen: false };
  Links = [
    { url: "/", text: "Idag" },
    { url: "/nyheter/", text: "Nyheter" },
    { url: "/schema/", text: "Schema" },
    { url: "/profiler/", text: "Personer" },
    { url: "/media/", text: "Galleri" },
    { url: "/blandaren/", text: "Bländaren" },
    { url: "/admin/", text: "Admin" }

  ];


  onClickProfile = () => {
    this.props.history.push(`/profiler/${Frack.CurrentUser.username}`);
    this.setState({ navOpen: false });
  };

  onClickHndler = url => {
    this.props.history.push(url);
    this.setState({ navOpen: false });
  };

  onOpenHndler = (state) => {
    this.setState({ navOpen: state });
  };

  LogoutHndler = () => {
    Frack.Logout();
    this.onClickHndler('/login')
  };  

  
  createButton = () => {
    if (this.state.navOpen === false) {
      return <button className='navButton' onClick={() => this.onOpenHndler(true)}>≡</button>;
    }
    return <button className='navButton' onClick={() => this.onOpenHndler(false)}>×</button>;
  };

 /* getOrganisation = () => {
    if (this.props.currentUser.n0llegroup) {
      return ( this.props.currentUser.n0llegroup.name)
    }
    return ( this.props.currentUser.type.name)
  }
  */

  createProfileCard = () => {
    return (  
      <img src={this.props.currentUser.profile_picture} alt="" onClick={this.onClickProfile} className='navigation-profil'/>
        /*<h3 className="agent-title">SECRET AGENT</h3>
        <div className='navigation-profil-text'>
        <h6>Subject: </h6>
        <p>{this.props.currentUser.name}</p>
        <h6>Organisation: </h6>
        <p> {this.getOrganisation()}</p>
    </div>
        <img src={this.props.currentUser.profile_picture} alt=""/>
  </div>*/)
  };

  createNavigation = () => {
    /*if (this.state.navOpen === true) {*/
      return (
        <div className='navigationBar'>
          {(this.props.currentUser) ? this.createProfileCard(): null}
          {this.Links.map((l, i) => {
            let linkClass = "linkClosed link typewriter-font";
            if (l.url === this.props.location.pathname)
              linkClass = "linkOpen link typewriter-font";

            if (l.text === this.Links[this.Links.length-1].text) {
              if (!this.props.currentUser) {
                return null
              }
              if (!this.props.currentUser.admin) {
                return null;
              }  
            }
            return (
              <div id='horizontalButtons'>
              <button
                id={l.text}
                key={i}
                className={linkClass}
                onClick={() => this.onClickHndler(l.url)}>
                <p className='link-text'>{l.text}</p>
              </button>
              </div>
            );
          })}
          <div id='horizontalButtons'>
              <button
                id='LoggaUt'
                className="linkClosed link typewriter-font"
                onClick={() => this.LogoutHndler()}>
                <p className='link-text'>Logga ut</p>
              </button>
          </div>
        </div>
      );
        /*}*/
  };

  createNavigationBar_mobile = () => {
    /*if (this.state.navOpen === true) {*/
      return (
        <div className='navigationBar'>
          {(this.props.currentUser) ? this.createProfileCard(): null}
        </div>
      );
        /*}*/
  };

    createNavigationDropdown = () => {
      if (this.state.navOpen === true) {
        return (
        <div className='navigationDropdown'>
        {this.Links.map((l, i) => {
          let linkClass = "linkClosed link typewriter-font";
          if (l.url === this.props.location.pathname)
            linkClass = "linkOpen link typewriter-font";

          if (l.text === this.Links[this.Links.length-1].text) {
            if (!this.props.currentUser) {
              return null
            }
            if (!this.props.currentUser.admin) {
              return null;
            }  
          }
          return (
            <button
              id={l.text}
              key={i}
              className={linkClass}
              onClick={() => this.onClickHndler(l.url)}>
              <p className='link-text'>{l.text}</p>
            </button>
          );
        })}
        <button
              id='LoggaUt'
              className="linkClosed link typewriter-font"
              onClick={() => this.LogoutHndler()}>
              <p className='link-text'>Logga ut</p>
            </button>
            </div>
            );
          }
    };

  render() {
    let classes = 'navigation'
    {if (this.state.navOpen) {
      classes = 'navigation navigation-open'
      }
     }
    return (
    <div className={classes}> 
    {this.createNavigation()}
    {this.createNavigationDropdown()}
    {this.createButton()}
    </div>
    );
  }
}

export default Navigation;
