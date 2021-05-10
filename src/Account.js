import React, {useState} from 'react';
import fire from './fire.js';

const Account = (user) => {
    const [props, setProps] = useState('');
    const [createBox, setCreateBox] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [counts, setCounts] = useState({crtId: 0, number: 0});
    const [name, setName] = useState('');

    // de afisat anunturi
    // de verificat dupa ce creez cont dc apare contul vechi in dreapta

    async function handlePost() {

        const userId = fire.auth().currentUser.uid;

        
        let p = [];
        
        fire.database().ref('/').once('value', snap => {
            
            snap.forEach(child => {
                p.push(child.val());
            });

        }).then(
            () => {
                    console.log(p[0]);
                        fire.database().ref('/postcount/').set({
                            crtId: p[0].crtId + 1,
                            number: p[0].number + 1
                        })
                .then(
                    () => {
                        var current = new Date();
                        console.log(current.toLocaleString());
                        fire.database().ref('posts/' + p[0].crtId).set({
                            title: title,
                            description: description,
                            userId: userId,
                            name: name,
                            posttime: current.toLocaleString(),
                        })
                    }
                )
            }
        )

        setCreateBox(!createBox);
        setTimeout(function () {
            window.location.reload(true);
        }, 1000);

    }

    if (user && fire.auth().currentUser) {
        const userId = fire.auth().currentUser.uid;
        fire.database().ref('/users/' + userId).once('value', snap => {
            let p = [];
            snap.forEach(child => {
                p.push(child.val());
            });
            //console.log(p);
            if(!props)
                setProps(p);
            if(!name)
                setName(p[2]);
        });
        return (
            <>
                <>
                    {createBox && 
                        <div className="createBox">
                            Creare anunț
                            <label> Titlu </label>
                            <input type="text"
                                autoFocus required value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                            <label> Detalii anunț</label>
                            <textarea
                                id="description"
                                autoFocus required value={description}
                                placeholder="Recomandăm cât mai multe detalii"
                                onChange={(e) => setDescription(e.target.value)} />
                            
                            <span id='close' onClick={() => setCreateBox(!createBox)} >închide fereastra</span>
                            <div className="btnContainer">
                            <>
                                <button onClick={handlePost} > Postează </button>
                            </>
                </div>
                        </div>
                    }
                </>
                <div className="accountContainer">
                    <label>Nume cont: {props[2]}</label>
                    <label>Tip cont: {props[1]}</label>
                    <label><p id="create" onClick={() => setCreateBox(!createBox)}> Creează anunț!</p></label>
                    
                </div>
            </>
            
        )
    }
    else 
        return (
            
            <div className="accountContainer">
                <label>Aici poate fi contul tău</label>
                <label>Autentifică-te!</label>
                <label>🔧🔧🔧</label>
            </div>
        )
}

export default Account;