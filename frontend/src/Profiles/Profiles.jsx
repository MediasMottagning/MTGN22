import React, { Component } from "react";
import ProfileButton from "./ProfileButton";
import Frack from "./../Frack";
import "./Profiles.css";
import Loader from "../loader"

class Profiles extends Component {
  state = { profiles: [] , loading: true};

  componentDidMount() {
    window.scrollTo(0, 0);
    Frack.User.GetAll().then(res => {
      //console.log(res);
      const profiles = res.data;
      profiles.sort((a, b) => this.sortUsers(a,b))

      profiles.sort((a, b) => this.sortN0llan(a,b))

      var phosarGroup = "ÖPH"
      var electus = "Olli";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))
      var electus = "Amalia";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))
      var electus = "Kraft";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))

      var phosarGroup = "KPH"
      var electus = "Gustav";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))
      var electus = "Lotta";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))

      var phosarGroup = "INPHO"
      var electus = "Jessie";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))
      var electus = "Fanny";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))

      var phosarGroup = "ARR"
      var electus = "Manda";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))
      var electus = "Nilsson Järnvägsgrillson";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))

      var phosarGroup = "VRAQUE"
      var electus = "Hilda";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))
      var electus = "Moa";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))

      var phosarGroup = "RSA"
      var electus = "Mallory";
      profiles.sort((x, y) => this.electusFirst(x,y,electus, phosarGroup))



      this.setState({ profiles: profiles, loading: false});
    }).catch((errer) => {
      Frack.Logout();
      this.props.history.push('/login');
    });
  }

  clickHandeler = (index, userName) => {
    //console.log(index)
    this.props.history.push({pathname:`/profiler/${userName}`, state:{profiles:this.state.profiles, index:index}});
  };

  sortUsers = (a, b) => {
    const group = ['nØllan', 'ÖPH', 'KPH','INPHO','ARR','LEK', 'VRAQUE', 'RSA']

    if (a.hidden !== b.hidden) {
      return( a.hidden - b.hidden)
    }
    if (group.indexOf(a.type.name) !== group.indexOf(b.type.name)) {
      return (group.indexOf(a.type.name) - group.indexOf(b.type.name))
    }

    if (a.n0llegroup && b.n0llegroup) {
      if (a.n0llegroup.name !== b.n0llegroup.name) {
        return(a.n0llegroup.name - b.n0llegroup.name)
      }
    }
    return 0;
  }

  sortN0llan = (a, b) => {
    const gr0up = ["Fraque & Furious", 'Fight Club', 'Stuntcrew',
                  'Wildcats', 'Mean Girls', 'Top Gang']


    if (a.type.name === 'nØllan' && b.type.name === 'nØllan')
    {
      if (gr0up.indexOf(a.n0llegroup.name) !== gr0up.indexOf(b.n0llegroup.name)) {
        return (gr0up.indexOf(a.n0llegroup.name) - gr0up.indexOf(b.n0llegroup.name))
      }
    }
    return 0;
  }



  electusFirst = (x, y, electus, phosarGroup) =>{
      if (x.type.name == phosarGroup && y.type.name == phosarGroup){
        if (x.name == electus){
          return -1
        }
        if (y.name == electus){
          return 1
        }
      }
      return 0
    }

  getDividerClass = (profile) => {
    if (profile.type.name === "RSA") {
      return "group-divider group-RSA"
    }
    return "group-divider"
  }

  render() {
    //console.log(this.state.types)
    const { profiles } = this.state;
    if (profiles.length === 1) {
      return null
    }

    //console.log(profiles)
    return (
      <div className='profiles-page'>
        {(this.state.loading ? <Loader loading={true} /> : <div>
          
        <div className='person-content'>
        <h1 className="view_header">Personer</h1> </div>

        <div className='profiles-contaner'>
          {profiles.map((profile, i) => {
            if (!profile.hidden) {
              if (i === 0) {
                return (<React.Fragment key={i}>
                  {(profile.type.name ==='nØllan') ? <h2 className={this.getDividerClass(profile)}>{`${profile.n0llegroup.name}`}</h2> : <h2 className={this.getDividerClass(profile)}>{`${profile.type.name}`}</h2>}
                  <ProfileButton index={i} name={profile.name} userName={profile.username} userImg={profile.profile_picture} clickHandeler={this.clickHandeler} />
                </React.Fragment>)
              }
              //console.log(profiles[i-1].type.name, profile.type.name)
              if (profiles[i-1].type.name !== profile.type.name || (profile.type.name ==='nØllan' && profiles[i-1].n0llegroup.name !== profile.n0llegroup.name)) {
                return (<React.Fragment key={i}>
                  {(profile.type.name ==='nØllan') ? <h2 className={this.getDividerClass(profile)}>{`${profile.n0llegroup.name}`}</h2> : <h2 className={this.getDividerClass(profile)}>{`${profile.type.name}`}</h2>}
                  <ProfileButton index={i} name={profile.name} userName={profile.username} userImg={profile.profile_picture} clickHandeler={this.clickHandeler} />
                </React.Fragment>)
              }
              return (<ProfileButton key={"a" + profile.id} index={i} name={profile.name} userName={profile.username} userImg={profile.profile_picture} clickHandeler={this.clickHandeler} />);
            }
            /*if (profiles[i-1].type.name !== profile.type.name || (profile.type.name ==='nØllan' && profiles[i-1].n0llegroup.name !== profile.n0llegroup.name)) {
              return (<React.Fragment key={i}>
                {(profile.type.name ==='nØllan') ? <h2 className="group-divider">{`${profile.n0llegroup.name}`}</h2> : <h2 className="group-divider">{`${profile.type.name}`}</h2>}
              </React.Fragment>)
            }*/
            return null;

          })}
        </div>
        </div>)}

      </div>
    );
  }
}

export default Profiles;
