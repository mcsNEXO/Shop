import './Product.css'

export default function Product(props) {
    return(
    <div className='product'>
        <div className='img-product'>
            <img></img>
        </div>
        <div className='desc-product'>
            <div class='name-product'>Moro schoes</div>
            <div class='prize-product'>30.00$</div>
        </div>
    </div>
    )
};
