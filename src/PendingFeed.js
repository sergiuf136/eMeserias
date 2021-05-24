import React, {useState} from 'react';
import fire from './fire';

const PendingFeed = (user) => {
    const [pr, setPr] = useState('');
    //const [accept, setAccept] = useState('');
    //const [decline, setDecline] = useState('');
    const [cancel, setCancel] = useState(false);
    const [del, setDel] = useState(false);
    const objs = [];


    if (user && fire.auth().currentUser) {
        const userId = fire.auth().currentUser.uid;
        console.log(userId);
        fire.database().ref('/users/' + userId + '/pendingOffers').once('value', snap => {
            let p = [];
            snap.forEach(child => {
                p.unshift(child.val());
                for (const k of Object.keys(p[0])) {
                    p[0][k].key = child.key;
                    // break;
                }
            });
            if(!pr)
                setPr(p);
            
        }).then(() =>{
            console.log(pr);

        })
    }

    function refreshPage () {
        setTimeout(function () {
            window.location.reload(true);
            //setMyFeed('incomingOffers');
            }, 1000)
    }

    const handleCancel = (offer) => {
        console.log(offer);
        const userId = fire.auth().currentUser.uid;
        fire.database().ref('users/' + userId + '/pendingOffers/' + offer.key + '/' + offer.userId).remove()
        fire.database().ref('users/' + offer.userId + '/incomingOffers/' + offer.key + '/' + userId).remove()

        refreshPage();
    }

    const handleDel = (offer) => {
        console.log(offer);
        const userId = fire.auth().currentUser.uid;
        fire.database().ref('users/' + userId + '/pendingOffers/' + offer.key + '/' + offer.userId).remove()
        refreshPage();
    }

    for (let i = 0; i < pr.length; i++) {
        for (const offer of Object.values(pr[i])) {
            console.log(offer.title);
            objs.push(
                <div className="feedContainer" key={i}>
                    <label>
                        {offer.title}
                    </label>
                    <label className="price">
                        Preț: {offer.price}
                    </label>
                    <label className="meta">
                    {offer.description}<br/><br/>
                        la data de: {offer.posttime}.
                    </label>
                    <label id="phone">contact: {offer.telno}</label>
                    <label>Status: <>{offer.status}</></label>
                    <div className="btnContainer">
                        {offer.status === 'pending' && <button onClick={() => {setCancel(offer)}} > Anulează </button>} 
                        {offer.status === 'Declined' && <button onClick={() => {setDel(offer)}} > Șterge </button>} 
                        {offer.status === 'Accepted' && <button onClick={() => {setDel(offer)}} > Șterge </button>} 
                        
                    </div>
                    
                </div>
            );
            
        }
    }

    console.log(objs);


    return (

        <>
            {cancel !== false &&
                <div className="deleteBox">
                    Ești sigur că vrei să anulezi oferta?
                        <>
                            <button onClick={() => handleCancel(cancel)} > Da </button>
                            <button onClick={() => {setCancel(false);}} > Nu </button>
                        </>
                </div>
            }

            {del !== false &&
                <div className="deleteBox">
                    Ești sigur că vrei să ștergi oferta?
                        <>
                            <button onClick={() => handleDel(del)} > Da </button>
                            <button onClick={() => {setDel(false);}} > Nu </button>
                        </>
                </div>
            }
            <div className="feed">
                Vezi ofertele trimise:
            {objs}
            </div>
        </>
    )

}

export default PendingFeed;