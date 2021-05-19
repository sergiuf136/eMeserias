import React, { useState } from 'react';
import fire from './fire';

const MyFeed = (user) => {
    const [props, setProps] = useState([]);
    const [edit, setEdit] = useState(false);

    const [createBox, setCreateBox] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [counts, setCounts] = useState({crtId: 0, number: 0});
    // const [name, setName] = useState('');
    // const [job, setJob] = useState('');

    const userId = fire.auth().currentUser.uid;

    //const plm = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident";
    //const link = "https://www.youtube.com/watch?v=euICzfQGAA8";
    const objs = [];

    /*const obj = (
        <div className="feedContainer">
            <label>
                <a href="https://www.youtube.com/watch?v=euICzfQGAA8">Pisica care spune pula pula?!</a>
            </label>
            {plm}
        </div>
    )*/

    let p = []
    fire.database().ref('/posts').once('value', snap => {
        snap.forEach(child => {
            p.push(child.val());
            //console.log(child.val());
            //console.log(p[0]);
        });
        console.log(props.length)
        p.reverse();
        if (!props.length) setProps(p);
    }).then(() => {

    })

    console.log(props);
    console.log(userId);


    async function handleEdit() {

    }

    for (let i = 0; i < props.length; i++) {
        // console.log(p[i].description);
        if (props[i].userId === userId)
            objs.push(
                <div className="feedContainer" key={i}>
                    <button onClick={setEdit(!edit)} > Editează Anunț </button>
                    <label>
                        {props[i].title}
                    </label>
                    <label className="meta">
                        {props[i].description}<br /><br />
                    Postat de: <text id="author">{props[i].name}</text> la data de: {props[i].posttime}.
                    </label>
                </div>
            );
    }

    // objs.push(obj);
    // objs.push(obj);
    // objs.push(obj);


    return (
        <><>
            {edit &&
                <div className="editBox">
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
                            <button onClick={handleEdit} > Salvează </button>
                        </>
                    </div>
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