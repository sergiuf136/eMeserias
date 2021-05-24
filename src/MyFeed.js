import React, {useState} from 'react';
import fire from './fire';

const MyFeed = (user) => {
    const [props, setProps] = useState([]);
    const userId = fire.auth().currentUser.uid;
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    // const [createBox, setCreateBox] = useState(false);
    const [title, setTitle] = useState('');
    const [telno, setTelno] = useState('');
    const [description, setDescription] = useState('');
    const objs = [];

    /*
        TODO:
        - cereri (acceptare/refuz)
            - cereri pending (trimitere in contul propriu id anunt)
            (optional) sa nu poata trimite de 2 ori
            - stergere la refuz + notificare client refuzat (status: pending/accept/refuz)
            (istoric)
        - editare nr tel
        - delete incomingOffers cand stergi si postarea mama
    */

    let p = []
    fire.database().ref('/posts').once('value', snap => {
        snap.forEach(child => {
            p.unshift(child.val());
            p[0].key = child.key;
            //console.log(p[0]);
            //console.log(child.key);
            //console.log(p);
            //console.log(p[0]);
        });
        //console.log(snap.val());
        //console.log(props.length)
        //p.reverse();
        if(props.length === 0)setProps(p);
    }).then(() => {
        
    })

    console.log(props);
    console.log(userId);

    function refreshPage () {
        //console.log('plm');
        setEdit(false);
        setDel(false);
        setTimeout(function () {
            window.location.reload(true);
            }, 1000);
    }

    function handleEdit () {
            var current = new Date();
            console.log(current.toLocaleString());
            fire.database().ref('posts/' + props[edit].key).set({
                title: title,
                description: description,
                userId: userId,
                name: props[edit].name,
                job: props[edit].job,
                telno: telno,
                posttime: current.toLocaleString(),
            }).then(refreshPage())
    }

    function editButton (i) {
        if(edit === false)
            setEdit(i);
        setTitle(props[i].title);
        setDescription(props[i].description);
        setTelno(props[i].telno);
    }

    function deleteButton (index) {
        if(del === false)
            setDel(index);
    }

    function handleDelete () {
        fire.database().ref('posts/' + props[del].key).remove().then(refreshPage())
    }


    for(let i = 0; i < props.length; i++) {
        // console.log(p[i].description);
        if(props[i].userId === userId)
            objs.push(
                <div className="feedContainer" key={i}>
                    <label className="deleteBtn" onClick={() => (deleteButton(i))}>Șterge Anunț</label>
                    <label>
                        {props[i].title}
                    </label>
                    <label className="meta">
                    {props[i].description}<br/><br/>
                    Postat de: <text id="author">{props[i].name}</text> la data de: {props[i].posttime}.
                    </label>
                    <label id="phone">contact: {props[i].telno}</label>
                    <button onClick={() => {editButton(i)}} > Editează Anunț </button>
                </div>
            );
    }

    // objs.push(obj);
    // objs.push(obj);
    // objs.push(obj);


    return (

        <><>
            {edit !== false &&
                <div className="createBox">
                    Editare anunț
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
                    <label> Telefon: </label>
                            <input type="tel" id="phone" name="phone"
                                pattern="[0-9]{10}"
                                autoFocus required value={telno}
                                onChange={(e) => setTelno(e.target.value)} />
                            <small>Format: 10 cifre legate</small><br></br>

                    <span id='close' onClick={() => {setEdit(false)}} >
                        închide fereastra</span>
                    <div className="btnContainer">
                        <>
                            <button onClick={handleEdit} > Salvează </button>
                        </>
                    </div>
                </div>
            }
            {del !== false &&
                <div className="deleteBox">
                    Ești sigur că vrei să ștergi anunțul?
                        <>
                            <button onClick={handleDelete} > Da </button>
                            <button onClick={() => {setDel(false); console.log("cv")}} > Nu </button>
                        </>
                </div>
            }
        </>
            <div className="feed">
                Vezi anunțurile tale:
            {objs}
            </div>
        </>
    )

}

export default MyFeed;