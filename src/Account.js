import React, {useState} from 'react';
import fire from './fire.js';

const Account = (user) => {
    const [props, setProps] = useState('');

    if (user){
        const userId = fire.auth().currentUser.uid;
        fire.database().ref('/users/' + userId).once('value', snap => {
            let p = [];
            snap.forEach(child => {
                p.push(child.val());
            });
            console.log(p);
            if(!props){
                setProps(p);
            };
        });
        return (
            
            <div className="accountContainer">
                <label>Nume cont: {props[2]}</label>
                <label>Tip cont: {props[1]}</label>
            </div>
        )
    }
    else 
        return '';
}

export default Account;