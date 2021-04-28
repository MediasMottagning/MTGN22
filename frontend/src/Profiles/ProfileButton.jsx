import React, { Component } from "react";

class ProfileButton extends Component {
  state = {};

  render() {
    return (
      <button
        className='profiles-button typewriter-font'
        onClick={() => this.props.clickHandeler(this.props.index ,this.props.userName)}>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 1000 1000'
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: "1.5"
          }}>
          <g transform='matrix(1,0,0,1,-2316,-481.535)'>
            <g id='Artboard1' transform='matrix(1,0,0,1,2316,481.535)'>
              <rect
                x='0'
                y='0'
                width='1000'
                height='1000'
                style={{ fill: "none" }}
              />
              <use
                xlinkHref={`#${this.props.userName}`}
                x='210'
                y='140.79'
                width='576.665px'
                height='576.665px'
                transform='matrix(1,0,0,1,0,0)'
              />
              <g transform='matrix(1,0,0,1,-2323,-500.535)'>
              <path
                  d='M3154,
                  610L2500,
                  610L2500,
                  1409.56L3154,
                  1409.56L3154,

                  693.297ZM3108,
                  1290L3108,

                  642L2534,
                  642L2534,
                  1315L3108,
                  1315Z'
                  style={{ fill: "grey", opacity: 0.3}}
                />
                <path
                  d='M3144,
                  610L2500,
                  610L2500,
                  1399.56L3144,
                  1399.56L3144,

                  693.297ZM3108,
                  1290L3108,

                  642L2534,
                  642L2534,
                  1215L3108,
                  1215Z'
                  style={{ fill: "white" }}
                />
              </g>
              <g transform='matrix(1,0,0,1,-979.033,-34.836)'>
                <text x='1480px' y='845px' dominantBaseline="middle" textAnchor="middle" style={{fontSize: "54px"}}>
                  {this.props.name}
                </text>
              </g>
            </g>
          </g>
          <defs>
            <image
              id={this.props.userName}
              width='577px'
              height='577px'
              xlinkHref={this.props.userImg}
            />
          </defs>
        </svg>
      </button>
    );
  }
}

export default ProfileButton;
