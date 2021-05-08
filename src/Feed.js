import React from 'react';

const Feed = (user) => {

    /*if (user === '')
        return (
            
        )
    else
        return (
            
        )*/
    const plm = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident";
    //const link = "https://www.youtube.com/watch?v=euICzfQGAA8";
    const objs = [(
            <div className="phantomElement">
                <label>
                    {plm}
                </label>
            </div>
        )];

    const obj = (
        <div className="feedContainer">
            <label>
                <a href="https://www.youtube.com/watch?v=euICzfQGAA8">Pisica care spune pula pula?!</a>
            </label>
            {plm}
        </div>
    )

    objs.push(obj);
    objs.push(obj);
    objs.push(obj);


    return (
        <div className="feed">
            
            {objs}
        </div>
    )

}

export default Feed;