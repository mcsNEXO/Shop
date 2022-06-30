import './Option.css';
import {NavLink} from 'react-router-dom'

export default function Option(props) {
    const child = process.env.PUBLIC_URL + '/img/jpg/child2.jpg';
    const man = process.env.PUBLIC_URL + '/img/jpg/man.jpg';
    const woman = process.env.PUBLIC_URL + '/img/jpg/woman.jpg';
    return(
        <div className="container-sex">
            <div className='title'>
                <span className='title-option'>Choose clothes for yourself</span>
            </div>
            <div className='option-sex'>
                <div className='option-choose'>
                    <img src={man} alt='child'/>
                    <div className='title-choose'>Man</div>
                    <div className='btn-choose'><button><NavLink to='man'>Check It Out</NavLink></button></div>
                </div>
                <div className='option-choose'>
                    <img src={woman} alt='child'/>
                    <div className='title-choose'>Woman</div>
                    <div className='btn-choose'><button><NavLink to='woman'>Check It Out</NavLink></button></div>
                </div>
                <div className='option-choose'>
                    <img src={child} alt='child'/>
                    <div className='title-choose'>Children</div>
                    <div className='btn-choose'><button><NavLink to='children'>Check It Out</NavLink></button></div>
                </div>
            </div>
        </div>
    )
};
