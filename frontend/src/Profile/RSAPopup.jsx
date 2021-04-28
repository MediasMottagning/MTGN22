import React from 'react';
import './Profile.css'

/*import UIfx from 'uifx';
import mp3File from '/static/media/terrible_noise.mp3';
const beep = new UIFx({asset: mp3File});
<button onClick={beep.play}>Signup</button>*/

const RSAPopup = (props) => {
    return ( 
        <div id='myModal' className='modal'>
            <div className={props.user === null ? 'modal-content' : 'modal-content rsa'}>
                
            <p>{props.text}</p>
            {props.c1 !== '' || props.user.type.name === "RSA" ? <button className="yes-btn" onClick={() => props.btnRSA(true)}>{props.c1}</button>: null}
            {props.c2 !== '' ? <button className="no-btn" onClick={() => props.btnRSA(false)}>{props.c2}</button>: null}
            </div>
        </div>
    );
}
 
export default RSAPopup;