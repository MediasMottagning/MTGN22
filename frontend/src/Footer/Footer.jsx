import React, { Component } from "react";
import './Footer.css'
import RR from '../assets/easter-eggs/RR.png'
//import eric from '/assets/companies/ericsson.png'

class Footer extends Component {

  sponsors = [
  {url:"https://www.sverigesingenjorer.se/bli-medlem/", img:require('../assets/companies/sverigesingenjörer.jpg')},
  {url:"https://mpyadigital.com/", img:require('../assets/companies/mpya_digital.png')},
  {url:"https://www.cgi.com/se/sv", img:require('../assets/companies/cgi.png')},
  {url:"https://www.columbiaroad.com/", img:require('../assets/companies/columbiaRoad.svg')},
  {url:"https://studybuddy.se/", img:require('../assets/companies/Studybuddy.png')},
  {url:"https://slagkryssaren.com/", img:require('../assets/companies/SKRY_LOGO_HORI_BLACK_RGB.png')},
  {url:"https://conversionista.com/", img:require('../assets/companies/conversionista.png')}]

  render() {
    return (
      <div className='footer'>
        {this.sponsors.map((sponsor, i) => (
          <a key={i} className='footer-linck' href={sponsor.url}><img src={sponsor.img} height="40px" alt="sponsor"/></a>
        ))}
       <a className='footer-linck' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank"><img src={RR} height="40px" alt="sponsor"/></a>
    </div>
    );
  }
}

export default Footer;
