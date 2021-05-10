import React, {useState} from 'react';
import fire from './fire';

const Feed = (user) => {
    const [props, setProps] = useState([]);


    const plm = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident";
    //const link = "https://www.youtube.com/watch?v=euICzfQGAA8";
    const objs = [];

    const obj = (
        <div className="feedContainer">
            <label>
                <a href="https://www.youtube.com/watch?v=euICzfQGAA8">Pisica care spune pula pula?!</a>
            </label>
            {plm}
        </div>
    )

    let p = []
    fire.database().ref('/posts').once('value', snap => {
        snap.forEach(child => {
            p.push(child.val());
            //console.log(child.val());
            //console.log(p[0]);
        });
        console.log(props.length)
        p.reverse();
        if(props.length === 0)setProps(p);
    }).then(() => {
        
    })

    console.log(props);

    for(let i = 0; i < props.length; i++) {
       // console.log(p[i].description);
        objs.push(
            <div className="feedContainer" key={i}>
                <label>
                    {props[i].title}
                </label>
                <label className="meta">
                {props[i].description}<br/><br/>
                Postat de: <text id="author">{props[i].name}</text> la data de: {props[i].posttime}.
                </label>
            </div>
        );
    }

    // objs.push(obj);
    // objs.push(obj);
    // objs.push(obj);


    return (
        <div className="feed">
            Vezi cele mai noi anunțuri!
            {objs}
        </div>
    )

}

export default Feed;