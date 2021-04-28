import React, { Component } from "react";
import Frack from "./../Frack";
import "./Profile.css";
import ReactQuill from "react-quill";
import Loader from "../loader";
import FlappyPhos from "./FlappyPhös";
import RSAPopup from "./RSAPopup";


//import skyMindre from "/assets/images/sky-mindre.png"
import rsa_eagle_vit from '../assets/profiles/rsa_eagle_vit.png'
import snaran from '../assets/easter-eggs/Snaran.png'
import jw from '../assets/easter-eggs/JW.png'
import darth from '../assets/easter-eggs/Darth.png'
import soff from '../assets/easter-eggs/soff.png'
import tuan from '../assets/easter-eggs/Tuan.png'
import jackie from '../assets/easter-eggs/jackie.png'
import lou from '../assets/easter-eggs/Lou.png'
import star from '../assets/profiles/star4.png'
import questionMark from '../assets/profiles/question.png'
import fannyNamn from '../assets/easter-eggs/fanny.gif'
import omnijin from '../assets/easter-eggs/omniman.gif'
import jackiechan from '../assets/easter-eggs/jackiechan.jpeg'
import nilsson from '../assets/easter-eggs/nilsson.jpg'
import kryss from '../assets/profiles/X.png' 


class Profile extends Component {
  state = {
    profiles: [],
    index: -1,
    edit: false,
    editPassword: false,
    loading: true,
    CurrentUser: null,
    popup: false,
    emilioPopup: false,
    popupIndex: 0,
    scoreFP: 0,
    dir: 0,
    isFlappyPhos: false,
    editorHtml: "",
    RSAPopup: true,
    factPopup: false,
    factText: ""
  };

  emilioScore = 50;

  constructor() {
    super();
    if (!Frack.CurrentUser) {
      Frack.UpdateCurrentUser();
    }
    //console.log(Frack.CurrentUser);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    //console.log("profile start");
    this.getUser();
  }

  componentWillUnmount() {
    this._isMounted = true;
    let profile = this.state.profiles[this.state.index];

    if (profile.type.name == "RSA") {
      return [document.body.style.setProperty(// möjligtvis en bugg här
        "url(final_webb_bg.png)", "background-image")]
    }
  }

  componentDidUpdate() {
    this._isMounted = false;
    if (this.state.profiles[this.state.index].type.name != "RSA") {
      return [document.body.style.setProperty("url(final_webb_bg.png",
        "background-image")]
    }
  }

  componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0)
    if (nextProps.match.params.user !== this.props.match.params.user) {
      //console.log("cwpr");
      const profiles = this.state.profiles;
      profiles.sort((a, b) => this.sortUsers(a, b));
      const index = profiles.findIndex(user =>
        this.findUsre(user, nextProps.match.params.user)
      );
      //console.log(index);
      this.setState({
        index: index, RSAPopup: true
      });
    }


  }

  comicsans = () => {
    if (this.state.popupIndex !== 4) {
      this.setState({
        popup: !this.state.popup
      });
    }
  };

  createComicsansPopup = () => {
    //console.log("popup");
    return (
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <h1 style={{color: "white"}}>
            <span role='img' aria-label='warning'>
              ⚠️
            </span>{" "}
            Warning
          </h1>
          <p style={{color: "white"}}>
            {`Är du ${"HELT ".repeat(
              this.state.popupIndex
            )}säker på att du vill ha`}
            <p
              style={{
                color: "rgb(255, 51, 136)",
                fontFamily: "comicsans",
                display: "inline"
              }}>
              comic sans
            </p>
            som font?
          </p>
          <button className='yes-btn' onClick={this.handleJa}>
            Ja
          </button>
          <button className='no-btn' onClick={this.handleNej}>
            Nej
          </button>
        </div>
      </div>
    );
  };

  handleJa = () => {
    this.setState({
      popup: false
    });
    if (this.state.popupIndex === 0) {
      this.setState({
        popup: false
      });
      this.foppesKnapp();
    } else {
      this.setState({
        popupIndex: 1 + this.state.popupIndex
      });
      this.nextPopup();
    }
  };

  nextPopup = async () => {
    await new Promise(resolve => setTimeout(resolve, 1));
    this.setState({ popup: true })
  }

  handleNej = () => {
    this.setState({
      popup: false,
      popupIndex: 0
    });
  };

  handelEditButton = () => {
    this.setState({ edit: !this.state.edit });
  };

  handelEditPasswordButton = () => {
    this.setState({ editPassword: !this.state.editPassword });
  };

  getUser = () => {
    //console.log("hej profil");
    if (this.props.location.state) {
      this.setState({
        profiles: this.props.location.state.profiles,
        index: this.props.location.state.index,
        loading: false
      });
    } else {
      //console.log("not found");
      Frack.User.GetAll()
        .then(res => {
          //console.log(res);
          const profiles = res.data;
          profiles.sort((a, b) => this.sortUsers(a, b));
          const index = profiles.findIndex(user => this.findUsre(user));
          if (index === -1) {
            this.props.history.push("/page-not-found");
          }
          //console.log(index);
          this.setState({ profiles: profiles, index: index, loading: false });
        })
        .catch(errer => {
          Frack.Logout();
          this.props.history.push("/login");
        });
    }
  };

  swopUesr = indexTo => {
    if (indexTo !== -1) {
      const { profiles } = this.state;
      this.setState({ index: indexTo, editPassword: false, edit: false });
      this.props.history.push({
        pathname: `/profiler/${profiles[indexTo].username}`,
        state: { profiles: profiles, index: indexTo }
      });
    }
  };

  findNext = () => {
    const { index, profiles } = this.state;
    for (let i = index + 1; i < profiles.length; i++) {
      if (!profiles[i].hidden) {
        return i;
      }
    }
    return -1;
  };

  findPrev = () => {
    const { index, profiles } = this.state;
    for (let i = index - 1; i >= 0; i--) {
      if (!profiles[i].hidden) {
        return i;
      }
    }
    return -1;
  };

  findUsre = (user, theUserSerct = this.props.match.params.user) => {
    //console.log(this.props.match.params.user);
    return user.username === theUserSerct;
  };

  sortUsers = (a, b) => {
    const group = [
      "nØllan",
      "ÖPH",
      "KPH",
      "INPHO",
      "ARR",
      "LEK",
      "VRAQUE",
      "RSA"
    ];
    if (group.indexOf(a.type.name) !== group.indexOf(b.type.name)) {
      return group.indexOf(a.type.name) - group.indexOf(b.type.name);
    }
    if (a.n0llegroup && b.n0llegroup) {
      if (a.n0llegroup.name !== b.n0llegroup.name) {
        return a.n0llegroup.name - b.n0llegroup.name;
      }
    }
    return 0;
  };

  changePassword = event => {
    event.preventDefault();
    const newPassword = event.target.newPassword.value;
    if (newPassword === event.target.confermPassword.value && newPassword.length > 3) {
      Frack.User.Update(this.state.profiles[this.state.index].id, {
        password: newPassword
      }).then(res => {
        this.setState({ editPassword: false });
      });
    }
  };

  userUpdate = event => {
    event.preventDefault();
    const { profiles, index } = this.state;
    const profile = profiles[index];

    var data = {
      description: event.target.description.value,
      q1: event.target.q1.value,
      q2: event.target.q2.value,
      q3: event.target.q3.value
    };

    Frack.User.Update(profile.id, data).then(res => {
      //console.log(res);
      Frack.User.GetByFilter("id=" + profile.id).then(res => {
        profiles[index] = res.data;
        this.setState({ edit: false, profiles: profiles });
      });
    });
  };

  EmilioKnapp = () => {
    this.setState({ isFlappyPhos: true });
  };

  getFlappyPh = () => {
    if (this.state.isFlappyPhos) {
      return (
        <div className='modal'>
          {" "}
          <FlappyPhos gameOver={this.gameOver} />{" "}
        </div>
      );
    }
    return (
      <button onClick={this.EmilioKnapp}>
        Kan du få {this.emilioScore} i FlappyPhös?
      </button>
    );
  };

  gameOver = score => {
    this.setState({ isFlappyPhos: false });

    this.setState({ emilioPopup: true, scoreFP: score });

    //console.log(score);
  };

  foppesKnapp = () => {
    return ([document.body.style.setProperty("font-family", "comicsans", "important"),
    document.body.style.setProperty("color", "rgb(255, 51, 136)", "important"),])
  }

  creatUser = (CurrentUser, profile) => {
    return (
      <React.Fragment>
        <div className='profile-text-divider'>
          {this.state.factPopup ? <RSAPopup
            user={null}
            text={this.state.factText}
            c1='ok'
            c2=''
            btnRSA={this.fact}></RSAPopup> : null}
          <h4>Grupp</h4>
          <p>
            {profile.type.name !== "nØllan" ? (
              <React.Fragment>{profile.type.name}<br /> </React.Fragment>
            ) : null}
            {profile.n0llegroup ? (
              <React.Fragment>{profile.n0llegroup.name}</React.Fragment>
            ) : null}
          </p>
        </div>
        <form onSubmit={this.userUpdate}>
          <div className='profile-text-space'>
            {profile.description || this.state.edit ? (
              <React.Fragment>
                <h4>Om mig</h4>
                {!this.state.edit ? (
                  <p>{profile.description}</p>
                ) : (
                    <input
                      placeholder='Berätta gärna lite om dig själv!'
                      defaultValue={profile.description}
                      name='description'
                      type='text'
                    />
                  )}
              </React.Fragment>
            ) : null}
          </div>
          <div className='profile-text-space'>
            {profile.q1 || this.state.edit ? (
              <React.Fragment>
                <h4>Vilket är ditt favoritfilmcitat?</h4>
                {!this.state.edit ? (
                  <p>{profile.q1}</p>
                ) : (
                    <input
                      placeholder='svar...'
                      type='text'
                      name='q1'
                      defaultValue={profile.q1}
                    />
                  )}
              </React.Fragment>
            ) : null}
            {profile.q2 || this.state.edit ? (
              <React.Fragment>
                <h4>Vilken är din favoritfilmscen?</h4>
                {!this.state.edit ? (
                  <p>{profile.q2}</p>
                ) : (
                    <input
                      placeholder='svar...'
                      type='text'
                      name='q2'
                      defaultValue={profile.q2}
                    />
                  )}
              </React.Fragment>
            ) : null}
            {profile.q3 || this.state.edit ? (
              <React.Fragment>
                <h4>Vad hade du haft på dig på röda mattan?</h4>
                {!this.state.edit ? (
                  <p>{profile.q3}</p>
                ) : (
                    <input
                      placeholder='svar...'
                      type='text'
                      name='q3'
                      defaultValue={profile.q3}
                    />
                  )}
              </React.Fragment>
            ) : null}
          </div>
          {this.state.edit ? (
            <input type='submit' value='Spara ändringar' />
          ) : null}
        </form>
      </React.Fragment>
    );
  };

  handleOk = () => {
    this.setState({ emilioPopup: false, scoreFP: 0 });
  };

  creatGamePopup = () => {
    if (this.state.scoreFP >= this.emilioScore) {
      return (
        <div id='myModal' className='modal'>
          <div className='modal-content'>
            <h1>
              <span role='img' aria-label='warning'>
                😄
            </span>
              Du klarade {this.emilioScore} poäng!
          </h1>
            <p>Du fick hela {this.state.scoreFP} poäng! WOW! GRATTIS!!</p>
            <a href="https://forms.gle/Dh33ErcMbvAQaBncA" className="yes-btn">Jag vill vinna! 😍</a>
            <button className='no-btn' onClick={this.handleOk}>
              Jag vill inte vinna 😢
          </button>

          </div>
        </div>
      )
    }
    return (
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <h1>
            <span role='img' aria-label='warning'>
              {" "}
              😥{" "}
            </span>{" "}
            Du fick inte {this.emilioScore} poäng
          </h1>
          <p>Du fick bara {this.state.scoreFP} poäng</p>
          <button className='yes-btn' onClick={this.handleOk}>
            OK
          </button>
        </div>
      </div>
    );
  };

  RSAsubmit = event => {
    //console.log("RSA");
    event.preventDefault();
    const { profiles, index } = this.state;
    const profile = profiles[index];

    //console.log("submit", index, this.state.editorHtml);
    //console.log(event.target.q3.value)

    var data = {
      description: this.state.editorHtml,
      q1: event.target.q1.value,
      q2: event.target.q2.value,
      q3: event.target.q3.value
    };
    //console.log(data);
    Frack.User.Update(profile.id, data).then(res => {
      //console.log(res);
      Frack.User.GetByFilter("id=" + profile.id).then(res => {
        profiles[index] = res.data;
        this.setState({ edit: false, profiles: profiles });
      });
    });
  };

  fact = () => {
    if (this.state.factPopup) {
      this.setState({ factPopup: false })
    } else {
      fetch('https://uselessfacts.jsph.pl/random.json').then(res => {
        this.setState({ factPopup: true, factText: res.text })
      }).catch(() => {
        this.setState({ factPopup: true, factText: 'ERROR' })
      })
    }
  }

  RSAPopup = (ok) => {
    if (ok) {
      this.setState({ RSAPopup: false });
    } else {
      this.props.history.push('/profiler/')
    }
  };

  RSABackground = () => {
    return [document.body.style.setProperty("background-image", "url('https://steamuserimages-a.akamaihd.net/ugc/959718413753048487/9F8EA0C42906E10E93A42C821B2F3718055913E0/')")]
  }
  creatUserRSA = (CurrentUser, profile) => {
    this.RSABackground()
    return (
      <React.Fragment>
        <div className="RSA_profile">
          {this.state.RSAPopup && profile.q1 !== "" && (profile.q3 !== "" || profile.q2 !== "") ? (
            <RSAPopup
              user={CurrentUser}
              text={profile.q1}
              c1={profile.q2}
              c2={profile.q3}
              btnRSA={this.RSAPopup}
            />
          ) : null}

          <div className={(profile.type.name === "RSA" ? 'rsa-text-divider' : 'profile-text-divider')}>
            <h4>Namn</h4>
            <p>{profile.name}</p>
            <h4>Grupp</h4>
            <p> {profile.type.name} </p>
          </div>
          <div className={(profile.type.name === "RSA" ? 'rsa-text-divider' : 'profile-text-divider')}>
            {this.state.edit ? (
              <form onSubmit={this.RSAsubmit}>
                <p>Nedan går det att fylla i information du vill ha på din profil.</p>
                <ReactQuill
                  style={{ background: "#fff" }}
                  theme={this.state.theme}
                  onChange={this.handleChange}
                  value={this.state.editorHtml}
                  modules={Profile.modules}
                  formats={Profile.formats}
                  bounds={".app"}
                  placeholder={"text..."}
                />
                <br />
                <p>Varje gång du uppdaterar din profil måste du fylla i vad knappar och popup rutan ska innehålla för att de ska existera!</p>
                <br />
                <p>Popup text (texten som användare får upp i en popup ruta när de går in på din profil)</p>
                <input name='q1' type='text' />
                <p>Grön knapp (Den gröna knappen gör det möjligt för användare att komma in på din profil)</p>
                <input name='q2' type='text' />
                <p>Röd knapp (Den röda knappen skickar användare bort från din profil)</p>
                <input name='q3' type='text' />

                {this.state.edit ? <input type='submit' /> : null}
              </form>
            ) : (
                <div
                  className='news-text typewriter_font'
                  dangerouslySetInnerHTML={{ __html: profile.description }}
                />
              )}
          </div>
        </div>
      </React.Fragment>
    );
  };

  handleChange = html => {
    this.setState({ editorHtml: html });
  };

  render() {
    //console.log(this.state.editorHtml);
    const CurrentUser = this.props.currentUser;
    if (this.state.index === -1) {
      return null;
    }
    if (!CurrentUser) {
      return null;
    }
    //console.log(CurrentUser);
    let index = this.state.index;
    let profile = this.state.profiles[index];
    let next = this.findNext();
    let prev = this.findPrev();

    return (
      <div className='profile-page page typewriter_font'>
        {this.state.emilioPopup ? this.creatGamePopup() : null}
        {this.state.popup ? this.createComicsansPopup() : null}
        {this.state.loading ? (
          <Loader loading={true} />
        ) : (
            <div className="profile_site">
              <div className={(profile.type.name === "RSA" ? 'rsa-contaner profile-contaner-flyut-left' : 'profile-contaner profile-contaner-flyut-left')}>
                <div className={(profile.type.name === "RSA" ? 'rsa-box' : 'profile-box')}>

                  {/* if/else sats för RSA-profilerna */}
                  <div className={(profile.type.name === "RSA" ? 'profile-top-img rsa-text-divider' : 'profile-top-img')}>
                  <div className="container">
                  {/*(profile.username === "sacho") ? <a href={`https://www.youtube.com/watch?v=rTfa-9aCTYg`} ><img alt="" id={profile.id} width="100%" src={profile.profile_picture} className="prof_img" /></a> :
                      (profile.username === "namn2goeshere") ? <a href="https://www.youtube.com/watch?v=zDUQTEsawhI" ><img alt="" id={profile.id} width="100%" src={profile.profile_picture} className="prof_img" /></a> :
                      (profile.username === "jessie") ? <a href={`/profiler/`} ><img alt="" id={profile.id} width="100%" src={shrekJessie} className="prof_img" /></a>:*/
                      (profile.username === "nilsson järnvägsgrillson") ? <img alt="" id={profile.id} width="100%" src={nilsson} className="prof_img"/>:
                      (profile.username === "jin") ? <img alt="" id={profile.id} width="100%" src={omnijin} className="prof_img" />:
                      (profile.username === "jackie") ? <img alt="" id={profile.id} width="100%" src={jackiechan} className="prof_img"/>:
                      (profile.username === "max jr.") ? <a href="https://www.youtube.com/watch?v=YUhMRnEABfc" ><img alt="" id={profile.id} width="100%" src={profile.profile_picture} className="prof_img" /></a> :
                      (profile.username === "soff") ? <a href="https://www.youtube.com/watch?v=l0Nc0-dFwAI" ><img alt="" id={profile.id} width="100%" src={profile.profile_picture} className="prof_img" /></a> :
                        <img alt="" id={profile.id} width="100%" src={profile.profile_picture} className="prof_img" />}
                        <div class="kryss">
                          <a href={`/profiler/`}>
                          <img
                          src={kryss}
                          width='100%'
                          alt=''
                          className="conf_kryss"
                        /></a></div> 
                        </div>
              <div className="container">
                <div className="profile-name">
                    {/*(profile.type.name === "INPHO" && profile.name === "Fanny") ? (
              <React.Fragment>
                <img
                  src={fannyNamn}
                  alt='Fanny'
                  align='center'
                  className='name_img'
                />
                <br />
                <br />
              </React.Fragment>
            ) :*/

            (profile.type.name === "INPHO" && profile.name === "Snaran") ? (
              <React.Fragment>
                <img
                  src= {snaran}
                  alt='snaran'
                  align='center'
                  className='name_img'
                />
                <br />
                <br />
              </React.Fragment>
            ) :

            (profile.type.name === "INPHO" && profile.name === "JW") ? (
              <React.Fragment>
                <img
                  src= {jw}
                  alt='jw'
                  align='center'
                  className='name_img'
                />
                <br />
                <br />
              </React.Fragment>
            ) :

            (profile.type.name === "INPHO" && profile.name === "Darth") ? (
              <React.Fragment>
                <img
                  src= {darth}
                  alt='darth'
                  align='center'
                  className='name_img'
                />
                <br />
                <br />
              </React.Fragment>
            ) :

            (profile.type.name === "INPHO" && profile.name === "Tuan") ? (
              <React.Fragment>
                <img
                  src= {tuan}
                  alt='tuan'
                  align='center'
                  className='name_img'
                />
                <br />
                <br />
              </React.Fragment>
            ) :

            (profile.type.name === "INPHO" && profile.name === "Soff") ? (
              <React.Fragment>
                <img
                  src= {soff}
                  alt='soff'
                  align='center'
                  className='name_img'
                />
                <br />
                <br />
              </React.Fragment>
            ) :

            (profile.type.name === "INPHO" && profile.name === "Jackie") ? (
              <React.Fragment>
                <img
                  src= {jackie}
                  alt='jackie'
                  align='center'
                  className='name_img'
                />
                <br />
                <br />
              </React.Fragment>
            ) :

            (profile.type.name === "INPHO" && profile.name === "Lou") ? (
              <React.Fragment>
                <img
                  src= {lou}
                  alt='lou'
                  align='center'
                  className='name_img'
                />
                <br />
                <br />
              </React.Fragment>
            ) :

            (profile.type.name === "RSA") ? (
                <div class="rsa-name">{profile.name}</div>
            ) :
            (
                <div class="profile-name">{profile.name}</div>
              )}

              </div>

                    {profile.type.name === "RSA"
                      ? <img
                        src={rsa_eagle_vit}
                        width='80%'
                        alt=''
                        className="conf_img rsa_logga"
                      />
                      : /*(profile.username === "joppe") ?
                        <img src="http://anglingcouncilireland.ie/wp-content/uploads/sites/244/2016/04/Fun_Facts_Stamp-01-01-01.jpg" width='100%' style={{ marginTop: '50px' }} /> :
                        (profile.username === "machi") ? <a href="https://www.youtube.com/watch?v=CigSkK0ooAo" ><img
                          src={star}
                          width='100%'
                          alt=''
                          className="change-img"
                        /></a> :
                        (profile.username === "machi") ? <a href="https://www.youtube.com/watch?v=CigSkK0ooAo" ><img
                          src={star}
                          width='100%'
                          alt=''
                          className="change-img"
                        /></a> :
                        (profile.username === "jin") ? <a href="https://www.youtube.com/watch?v=mqDOQzfM5Kc" ><img
                          src={star}
                          width='100%'
                          alt=''
                          className="change-img"
                        /></a> :
                        (profile.username === "fanny" && profile.type.name === "INPHO") ? <a href="https://www.youtube.com/watch?v=ZkNMZlkrzaU" ><img
                          src={star}
                          width='100%'
                          alt=''
                          className="change-img"
                          /></a> :
                          (profile.username === "sacho" && profile.type.name === "INPHO") ? <a href="https://drive.google.com/file/d/12moL6FcZnzx8f9UxPA0a2MjSK3BbBtnn/view?usp=sharing" ><img
                            src={star}
                            width='100%'
                            alt=''
                            className="change-img"
                          /></a>:*/

                        <img
                        src={star}
                        width='100%'
                        alt=''
                        className="change-img"
                      />
                    }   
                        <div class="kryss">
                          <a href={`/profiler/`} >
                          <img
                          src={kryss}
                          width='100%'
                          alt=''
                          className="conf_img"
                        /></a></div> 
                    </div>

                    {/* <TopSecret />
                <img className='profile-img' src={profile.profile_picture} alt=""/>*/}
                  </div>
                  {/* buttons */}
                  {profile.username === "emilio" ? this.getFlappyPh() : null}
                  {profile.username === "foppe" ? (
                    <button
                      onClick={this.comicsans /*this.foppesKnapp*/}
                      style={{
                        fontFamily: "comicsans",
                        color: "rgb(255, 51, 136)"
                      }}>
                      Comic sans?
                  </button>
                  ) : null}
                  <div className='profile-button-contaner'>
                    {prev !== -1 ? (
                      <a onClick={() => this.swopUesr(prev)} className="arrow left"></a>
                    ) : null}
                    <div className='profile-button-2'>
                      {CurrentUser.username === profile.username ? (
                        <button
                          className='profile-button'
                          onClick={this.handelEditButton}>Ändra profil</button>
                      ) : null}
                      {CurrentUser.username === profile.username ? (
                        <button
                          className='profile-button'
                          onClick={this.handelEditPasswordButton}>Ändra lösenord</button>
                      ) : null}
                    </div>
                    {next !== -1 ? (
                      <a onClick={() => this.swopUesr(next)} className="arrow right"></a>
                    ) : null}
                  </div>
                  {/* password form */}
                  {this.state.editPassword ? (
                    <form className="password-form fix-align" onSubmit={this.changePassword}>
                      <label> Nytt lösenord: </label>
                      <input name='newPassword' type='password' /> <br />
                      <label>Bekräfta lösenord: </label>
                      <input name='confermPassword' type='password' /> <br />
                      <input type='submit' value='Spara ändring' />
                    </form>
                  ) : null}
                  {/* text */}
                  {profile.type.name === "RSA"
                    ? this.creatUserRSA(CurrentUser, profile)
                    : this.creatUser(CurrentUser, profile)}

                  <div className="finger_prints">
                    {(profile.username === "insertnamehere2") ? <a href="https://drive.google.com/file/d/12moL6FcZnzx8f9UxPA0a2MjSK3BbBtnn/view?usp=sharing" ><img alt="prints" width="100%" src={questionMark} className="prints" /></a> : null}
                    {(profile.username === "insertnamehere") ? <a href="https://www.youtube.com/watch?v=b16-QrE6T8E" ><img alt="prints" width="100%" src={questionMark} className="prints" /></a> : null}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

Profile.modules = {
  toolbar: [{ background: [] }, { color: [] }, "image"],

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

Profile.formats = ["background", "color", "image"];

export default Profile;
