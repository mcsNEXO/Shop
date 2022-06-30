import './Menu.css'
import React from 'react';
import {NavLink} from 'react-router-dom'

export default function Menu(props) {
    const logo = process.env.PUBLIC_URL + '/img/jpg/picture5.png'
    const panorama = process.env.PUBLIC_URL + '/img/jpg/picture4.jpg'
    return(
        <main>
            <div className='container-baner'>
                <div className="picture-text">The latest sudo collection
                <div className='btn-text-pic'><button className='btn-pic' value='See more'><NavLink to='/'>See more</NavLink></button></div>
                </div>
                <div className="picture"><img src={logo} alt="picture-clothes"/></div>
            </div>
            <div className='container-collection'>
                <div className='min-desc'>Feel better in new style</div>
                <div className='title-collection'><h1>SPRITBOX collection</h1></div>
                <div className='desc-collection'>A collection for cyclists and more</div>
                <div className='btn-collection'><button><NavLink to='/'>Check it out</NavLink></button></div>
                <div className='baner-collection' style={{backgroundImage:`url(${panorama})`}}></div>
            </div>
        </main>
    )
};
