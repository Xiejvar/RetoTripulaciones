import React, {useState} from 'react'
import './shield.css'
import {ReactComponent as Logo} from './escuditos.svg'


const StarRating = (props) => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const getVal = (val) => {
        setRating(val)
        props.val(val)
        setRating(0)
    }
    return <div>
        {[...Array(5)].map((star,i)=>{
            const ratingValue = i +1;
            return <label>
                <input type='radio' name='rating' value={ratingValue} onClick={() => getVal(ratingValue)} />
                <Logo className="star" color={ratingValue <= (hover || rating) ? "#11215F" : "#F5F5F5"} size={100} 
                onMouseEnter={()=>setHover(ratingValue)} 
                onMouseLeave={()=>setHover(null)}/>
                </label>
        }) }
        </div>
}

export default StarRating;