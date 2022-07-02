import './OftenChosen.css'
import Product from './Product/Product'
import {useEffect} from 'react'

export default function OftenChosen(props) {
    const i = [1,2,3,4,5,6,7,8];

    const next = ()=>{
            const container = [...document.querySelectorAll('.slider-chosen')]
            container.forEach((item,i)=>{
                console.log(container);
                let containerWidth = item.getBoundingClientRect().width;
                item.scrollLeft +=containerWidth;
            })
    }
    const pre = ()=>{
        const container = [...document.querySelectorAll('.slider-chosen')]
        container.forEach((item,i)=>{
            console.log(container);
            let containerWidth = item.getBoundingClientRect().width;
            item.scrollLeft -=containerWidth;
        })
}
    return(
        <div className='often-chosen'>
            <div className='title-slider'>Often chosen products</div>
            <div className='slider-chosen'>
                     {i.map(()=>{
                        return(
                            <Product
                            key='1'/>
                        )
                     })}
            </div>
            <div className='slider-arrows'>
                    <i className="bi bi-arrow-left preBtn" onClick={pre}></i>
                    <i className="bi bi-arrow-right nextBtn" onClick={next}></i>
                </div>          
        </div>
    )
};
