import './Menu.css'
import React from 'react';
import {NavLink} from 'react-router-dom'
import Collection from '../Collection/Collection';
import Option from '../Option/Option';
import OftenChosen from '../OftenChosen/OftenChosen';

export default function Menu(props) {
    const logo = process.env.PUBLIC_URL + '/img/jpg/picture5.png';
    return(
        <main>
            <div className='container-baner'>
                <div className="picture-text">
                    The latest sudo collection
                    <div className='btn-text-pic'>
                        <button className='btn-pic' value='See more'><NavLink to='/'>See more</NavLink></button>
                    </div>
                </div>
                <div className="picture">
                    <img src={logo} alt="picture-clothes"/>
                </div>
            </div>
            <Collection/>
            <Option/>
            <OftenChosen/>
        </main>
    )
};
