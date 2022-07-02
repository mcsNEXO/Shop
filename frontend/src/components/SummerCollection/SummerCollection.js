import './SummerCollection.css'

export default function SummerCollection(props) {
    const beach = process.env.PUBLIC_URL + '/img/jpg/beach.jpg';

    return(
        <div className="container-summer">
            <div class="title-summer">Get ready for summer</div>
            <div className='img-summer'><img src={beach} alt='beach'></img></div>
        </div>
    )
};
