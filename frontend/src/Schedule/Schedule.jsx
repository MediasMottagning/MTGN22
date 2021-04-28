import React, { Component } from "react";
import "./Schedule.css";

class Schedule extends Component {
  //Check if the user is admin, if --> they can upload and delete, should this be here??
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  state = {
    mode: "WEEK",
  };

  modeHandler = (event) => {
    this.setState({ mode: event.target.value })
  }

  btn_class = (event) => {
    if (this.state.mode === event) {
      return "mode_btn selected_btn"
    }
    return "mode_btn"

  }

  render() {
    /* <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FStockholm&amp;src=bWVkaWV0ZWtuaWsuY29tX3FibjVlNmhmczN0bzMwZ2ltMzBrNnFlNG9jQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%237986CB" style="border:solid 1px #777" width="800" height="600" frameborder="0" scrolling="no"></iframe> */
    var calendar = "";
    if (this.state.mode === "DAY") {
      calendar = <iframe  title="DAY" src="https://calendar.google.com/calendar/embed?src=c_018tfse3dkgpkus2odji1djtec%40group.calendar.google.com&amp;ctz=Europe%2FStockholm&amp;src=medieteknik.com_qbn5e6hfs3to30gim30k6qe4oc%40group.calendar.google.com&amp;color=%0000ff&amp;showDate=0&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=DAY" width="100%" height="600" frameBorder="0" scrolling="yes"></iframe>
    }
    if (this.state.mode === "WEEK") {
      calendar = <iframe title="WEEK" src="https://calendar.google.com/calendar/embed?src=c_018tfse3dkgpkus2odji1djtec%40group.calendar.google.com&amp;ctz=Europe%2FStockholm&amp;src=medieteknik.com_qbn5e6hfs3to30gim30k6qe4oc%40group.calendar.google.com&amp;color=%0000ff&amp;showDate=0&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=WEEK" width="100%" height="600" frameBorder="0" scrolling="yes"></iframe>
    }
    /*if (this.state.mode === "WEEK") {
      calendar = <iframe title="WEEK" src="https://calendar.google.com/calendar/embed?src=c_018tfse3dkgpkus2odji1djtec%40group.calendar.google.com&ctz=Europe%2FStockholm&amp;src=medieteknik.com_qbn5e6hfs3to30gim30k6qe4oc%40group.calendar.google.com&amp;color=%237CB342&amp;showDate=0&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=WEEK" width="100%" height="600" frameBorder="0" scrolling="yes"></iframe>
    } */
    if (this.state.mode === "AGENDA") {
      calendar = <iframe title="AGENDA"  src="https://calendar.google.com/calendar/embed?src=c_018tfse3dkgpkus2odji1djtec%40group.calendar.google.com&amp;ctz=Europe%2FStockholm&amp;src=medieteknik.com_qbn5e6hfs3to30gim30k6qe4oc%40group.calendar.google.com&amp;color=%0000ff&amp;showDate=0&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA" width="100%" height="600" frameBorder="0" scrolling="yes"></iframe>
    }
    return (
      <div className="page">
        <div className="content">
        <h1 className="view_header">Schema</h1>
        <button onClick={this.modeHandler} value="DAY" className={this.btn_class("DAY")} >Dag</button>
        <button onClick={this.modeHandler} value="WEEK" className={this.btn_class("WEEK")}>Vecka</button>
        <button onClick={this.modeHandler} value="AGENDA" className={this.btn_class("AGENDA")}>Program</button>
        <div style={{zIndex:2}}>{calendar}</div>
        {//<div style={{zIndex:1, position: 'fixed', top: "0px"}}><Loader loading={true}/></div>
        }
        </div>
      </div>);
  }
}

export default Schedule;
