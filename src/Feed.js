import React, { useState } from 'react';
import fire from './fire';

const Feed = (user) => {
    const [props, setProps] = useState([]);
    const [job, setJob] = useState('unauth');
    const [createOffer, setCreateOffer] = useState(false);
    const [price, setPrice] = useState('0');
    const [description, setDescription] = useState('');
    const [telno, setTelno] = useState('');
    const [name, setName] = useState('');
    const objs = [];

    if (user && fire.auth().currentUser) {
        const userId = fire.auth().currentUser.uid;
        fire.database().ref('/users/' + userId).once('value', snap => {
            let p = [];
            snap.forEach(child => {
                if(child.key !== "incomingOffers" && 
                    child.key !== "pendingOffers")
                    p.push(child.val());
                console.log(child.key);
            });
            
            if (job === 'unauth')
                setJob(p[1]);
            if (!name)
                setName(p[2]);

        });
    }

    console.log(name);

    let p = []
    fire.database().ref('/posts').once('value', snap => {
        snap.forEach(child => {
            p.unshift(child.val());
            p[0].key = child.key;
        });
        console.log(props.length)
        if (props.length === 0) setProps(p);
    }).then(() => {

    })

    console.log(props);


    async function handleOffer() {

        const userId = fire.auth().currentUser.uid;

        var current = new Date();
        console.log(current.toLocaleString());
        fire.database().ref('users/' + props[createOffer].userId + '/incomingOffers/' + props[createOffer].key + '/' + userId ).set({
            price: price,
            description: description,
            userId: userId,
            name: name,
            job: job,
            telno: telno,
            posttime: current.toLocaleString(),
            title: props[createOffer].title,
            status: 'pending'
        })

        fire.database().ref('users/' + userId + '/pendingOffers/' + props[createOffer].key + '/' + props[createOffer].userId).set({
            price: price,
            description: description,
            userId: props[createOffer].userId,
            telno: props[createOffer].telno,
            posttime: current.toLocaleString(),
            title: props[createOffer].title,
            status: 'pending'
        })

        setCreateOffer(false);

        setTimeout(function () {
            window.location.reload(true);
        }, 1000);

    }


    for (let i = 0; i < props.length; i++) {
        objs.push(
            <div className="feedContainer" key={i}>
                <label>
                    {props[i].title}
                </label>
                <label className="meta">
                    {props[i].description}<br /><br />
                Postat de: <text id="author">{props[i].name}</text> la data de: {props[i].posttime}.
                <label id="phone">contact: {props[i].telno}</label>
                    {
                        props[i].job !== job && job !== 'unauth' &&
                        <button onClick={() => { setCreateOffer(i) }} > Trimite o ofertă! </button>
                    }
                </label>
            </div>
        );
    }


    return (
        <>
            <div className="feed">
                Vezi cele mai noi anunțuri!
            {objs}
            </div>
            <>
                {
                    createOffer !== false &&
                    <div className="createBox">
                        Creează ofertă
                        <label> Telefon: </label>
                        <input type="tel" id="phone" name="phone"
                            pattern="[0-9]{10}"
                            autoFocus required value={telno}
                            onChange={(e) => setTelno(e.target.value)} />
                        <small>Format: 10 cifre legate</small><br></br>
                        <label>Preț </label>
                        <input type="text"
                            autoFocus required value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                        <label> Detalii oferta</label>
                        <textarea
                            id="description"
                            autoFocus required value={description}
                            placeholder="Ai ceva de adăugat?"
                            onChange={(e) => setDescription(e.target.value)} />

                        <span id='close' onClick={() => setCreateOffer(false)} >închide fereastra</span>
                        <div className="btnContainer">
                            <>
                                <button onClick={() => {
                                    var phoneno = /0[0-9]{9}|0[0-9]{3} [0-9]{3} [0-9]{3}|\(\+[0-9]{2}\)[0-9]{9}|\(\+[0-9]{2}\) [0-9]{3} [0-9]{3} [0-9]{3}|\(\+[0-9]{2}\)[0-9]{3} [0-9]{3} [0-9]{3}/gm

                                    if (telno.match(phoneno)) {
                                        handleOffer();
                                    }
                                    else {
                                        alert("Numarul de telefon nu este valid!");
                                    }
                                }} > Trimite! </button>
                            </>
                        </div>
                    </div>
                }
            </>
        </>
    )

}

export default Feed;