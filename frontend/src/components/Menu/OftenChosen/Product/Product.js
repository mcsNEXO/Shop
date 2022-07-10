import './Product.css'

export default function Product(props) {
    return(
    <div className='product'>
        <div className='img-product'>
            {/* <img></img> */}
        </div>
        <div className='desc-product'>
            <div className='name-product'>Moro schoes</div>
            <div className='prize-product'>30.00$</div>
        </div>
    </div>
    )
};
