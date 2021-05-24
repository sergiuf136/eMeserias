import React, { useState } from 'react';
import fire from './fire';

const OffersFeed = (props) => {

    const {
        user,
        // setMyFeed,
        // myFeed
    } = props;


    const [pr, setPr] = useState('');
    const [delOffer, setDelOffer] = useState(false);
    const objs = [];


    if (user && fire.auth().currentUser) {
        const userId = fire.auth().currentUser.uid;
        console.log(userId);
        fire.database().ref('/users/' + userId + '/incomingOffers').once('value', snap => {
            let p = [];
            snap.forEach(child => {
                p.unshift(child.val());
                //p[0].key = child.key;
                for (const k of Object.keys(p[0])) {
                    p[0][k].key = child.key;
                    // break;
                }

            });
            if (!pr)
                setPr(p);

        }).then(() => {
            console.log(pr);

        })
    }

    function refreshPage () {
        setTimeout(function () {
            window.location.reload(true);
            //setMyFeed('incomingOffers');
            }, 1000)
    }

    const handleAccept = (offer) => {
        const userId = fire.auth().currentUser.uid;

        fire.database().ref('users/' + userId + '/incomingOffers/' + offer.key + '/' + offer.userId).set({
            price: offer.price,
            description: offer.description,
            userId: offer.userId,
            telno: offer.telno,
            posttime: offer.posttime,
            title: offer.title,
            status: 'Accepted'
        })

        fire.database().ref('users/' + offer.userId + '/pendingOffers/' + offer.key + '/' + userId).set({
            price: offer.price,
            description: offer.description,
            userId: userId,
            telno: offer.telno,
            posttime: offer.posttime,
            title: offer.title,
            status: 'Accepted'
        })

        refreshPage();
    }

    const handleDecline = (offer) => {
        const userId = fire.auth().currentUser.uid;

        fire.database().ref('users/' + userId + '/incomingOffers/' + offer.key + '/' + offer.userId).remove()

        fire.database().ref('users/' + offer.userId + '/pendingOffers/' + offer.key + '/' + userId).set({
            price: offer.price,
            description: offer.description,
            userId: offer.userId,
            telno: offer.telno,
            posttime: offer.posttime,
            title: offer.title,
            status: 'Declined'
        })

        refreshPage();
    }

    const handleDelete = (offer) => {
        const userId = fire.auth().currentUser.uid;
        fire.database().ref('users/' + userId + '/incomingOffers/' + offer.key + '/' + offer.userId).remove()
            .then(() => {
                setDelOffer(false);
                refreshPage();
            })
        
    }

    for (let i = 0; i < pr.length; i++) {
        for (const offer of Object.values(pr[i])) {
            console.log(offer);
            objs.push(
                <div className="feedContainer" key={i}>
                    <label>
                        {offer.title}
                    </label>
                    <label className="price">
                        Preț: {offer.price}
                    </label>
                    <label className="meta">
                        {offer.description}<br /><br />
                    Primit de la: <text id="author">{offer.name}</text> <br />la data de: {offer.posttime}.
                    </label>
                    <label id="phone">contact: {offer.telno}</label>
                    <div className="btnContainer">
                        {offer.status === 'pending' ?
                            <>
                                <button onClick={() => { handleAccept(offer) }} > Acceptă </button>
                                <button onClick={() => { handleDecline(offer) }} > Refuză </button>
                            </> : (
                                offer.status === 'Accepted' &&
                                <button onClick={() => { setDelOffer(offer) }} > Șterge </button>
                            )
                        }
                    </div>
                </div>
            );
        }
    }

    console.log(objs);


    return (
        <>
            <>
                {delOffer !== false &&
                    <div className="deleteBox">
                        Ești sigur că vrei să ștergi oferta?
                    <>
                            <button onClick={() => { handleDelete(delOffer)}} > Da </button>
                            <button onClick={() => { setDelOffer(false); console.log("cv") }} > Nu </button>
                        </>
                    </div>
                }
            </>
            <>
                <div className="feed">
                    Vezi ofertele primite:
            {objs}
                </div>
            </>
        </>
    )

}

export default OffersFeed;