import './OftenChosen.css'
import Product from './Product/Product'

export default function OftenChosen(props) {
    const i = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},];

    const next = ()=>{
            const container = [...document.querySelectorAll('.slider-chosen')]
            container.forEach((item,i)=>{
                let containerWidth = item.getBoundingClientRect().width;
                item.scrollLeft +=containerWidth;
            })
    }
    const pre = ()=>{
        const container = [...document.querySelectorAll('.slider-chosen')]
        container.forEach((item,i)=>{
            let containerWidth = item.getBoundingClientRect().width;
            item.scrollLeft -=containerWidth;
        })
}
    return(
        <div className='often-chosen'>
            <div className='title-slider'>Often chosen products</div>
            <div className='slider-chosen'>
                     {i.map((item)=>{
                        return(
                            <Product
                            key={item.id}/>
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
