import React, { Component } from "react";
import "./Home.css";
import Frack from "../Frack";
import Media from "../Media/MediaImg";
import Filmproj from "../Media/Filmproj";
import Loader from "../loader"
import Lightbox from "lightbox-react";
import "lightbox-react/style.css";
import TheNews from "../News/TheNews";
import './../Media/Media.css';
import ET from '../assets/ET_no_bg.png'
import moln from "../assets/moln.png"
import airplane from '../assets/aiplane.png'
import letter from './letter.gif'

class Home extends Component {
  //Check if the user is admin, if --> they can upload and delete??? should this be here?
  state = { newNews: [], newImg: [], loading: true, bubbolJump: true, filmprojektet: [], photoIndex: 0, showLightBox: false, filmIframe: [] };

  filmprojekt_namn = "RGB/SW";

  componentDidMount() {
    window.scrollTo(0, 0)
    Frack.News.GetAll().then((res) => {
      this.setState({ newNews: res.data })
      Frack.Media.GetAll().then((res) => {
        let filmprojektet = [];
        let iframes = [];
        // eslint-disable-next-line
        res.data.map((media) => {
          // eslint-disable-next-line
          if (media.event.name == this.filmprojekt_namn) {
            filmprojektet.push(media)
            iframes.push(<iframe
              title={media.id}
              src={"https://" + media.video_link}
              position='absolute'
              width='100%'
              height='100%'
              styles={{ height: "25px" }}
            />)
          }
        })
        this.setState({ newImg: res.data, filmprojektet: filmprojektet, filmIframe: iframes, loading: false })
        this.accessGranted()

      });
    }).catch((errer) => {
      Frack.Logout();
      this.props.history.push('/login');
    });
  }

  getLink = () => {
    if (this.props.currentUser) {
      if (this.props.currentUser.type.name == "nØllan") {
        return "https://docs.google.com/forms/d/1EtJbbvck6xsIbW0Kb-Ya2b7iskgMRvZfUc5-fUBrcLw/viewform?edit_requested=true"
      } else {
        return "https://docs.google.com/forms/d/e/1FAIpQLSca15EKfmWb4cSwCJQK1bnhs0d8J7uUte-T7H-2p-AghbMdeQ/viewform"
      }
    }
    return null;
  }

  accessGranted = async url => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.setState({
      bubbolJump: false
    })
  };

  mediaClick = () => {
    this.props.history.push('/media/');
  }

  openLightBox = index => {
    this.setState({ showLightBox: true, photoIndex: index });

  }

  render() {
    //let news = this.state.newNews[0];
    let newImg = [] // this.state.newImg;
    let news = []
    console.log(this.state.newNews)
    let filmprojektet_thumb = this.state.filmprojektet;
    let filmprojektet = this.state.filmIframe;
    let photoIndex = this.state.photoIndex;

    for (let i = 0; i < this.state.newNews.length; i++){
      const date = new Date(this.state.newNews[i].timestamp)
      const today = new Date()
      if ((date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) || i === 0) {
        news.push(this.state.newNews[i])
      }
    }
    let n = 0
    for (let i = this.state.newImg.length-1; i >= 0; i--){
      if (n >= 4) {
        break;
      }
      if (this.state.newImg[i].type === 'image') {
        n++;
        newImg.push(this.state.newImg[i])
      }
    }

    /*
    bilder på flytande moln:
      <img className="moln_2" width="170px" src={moln}/>
      <img className="moln_1" width="200px" src={moln}/>
    */

    return (
      <div className="home-page">
        <a className="up_house" href="https://forms.gle/kprFcahWmtQYpFei7" target="_blank"><img width="80px" alt="Click me" src={ET} /></a>
        <a className="airplane" href="https://www.instagram.com/inphogram/?hl=sv" target="_blank"><img width="150px" alt="Click me" src={airplane} /></a>

        {(this.state.loading ? <Loader loading={true} /> :
          <div>
            <div className={(this.state.bubbolJump) ? "hjarta_lada big_lada" : "hjarta_lada small_lada"}>
              <a className='footer-linck' href={this.getLink()} >
                <img className={(this.state.bubbolJump) ? "bubbel bubbel-jump" : "bubbel"} src={letter} alt="Hjartat_lada" />
                <p  className="hjarta_text">Vad har du<br />på hjärtat?</p></a>
            </div>

            <div>

              {/*Senaste nyheten som lagts upp*/}
              {(this.state.newNews.length !== 0) ?
                <div><h3 className="subtitle">Senaste nytt</h3>
                {news.map((theNews) => <TheNews news={theNews}/>)}
             </div> : null}

              {(this.state.newImg.length !== 0) ?
                <h3 className="subtitle">Senaste bilderna och videorna</h3> : null}
              <div className='media-grid'>
                {newImg.map((media, i) => {
                  return (<Media key={i} deleteClass='' media={media} index={i} onClickHandeler={this.mediaClick}></Media>)
                })}
              </div>
            </div>
            {(this.state.filmprojektet.length !== 0) ? <h3 className="subtitle">{this.filmprojekt_namn}</h3> : null}
            <div className='media-grid'>
              {filmprojektet_thumb.map((media, i) => {
                return (<Filmproj key={i} media={media} index={i} onClickHandeler={() => this.openLightBox(i)}></Filmproj>)
              })}
            </div>

            {(this.state.showLightBox) ? <Lightbox
              mainSrc={filmprojektet[photoIndex]}
              nextSrc={filmprojektet[(photoIndex + 1) % filmprojektet.length]}
              prevSrc={
                filmprojektet[
                (photoIndex + filmprojektet.length - 1) % filmprojektet.length
                ]
              }
              onCloseRequest={() => this.setState({ showLightBox: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex:
                    (photoIndex + filmprojektet.length - 1) % filmprojektet.length
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % filmprojektet.length
                })
              }
            /> : null}



          </div>)}
      </div>
    );
  }
}

export default Home;
