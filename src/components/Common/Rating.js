import star_empty from '../../utils/images/icons/star-empty.svg';
import star_full from '../../utils/images/icons/star-full.svg';
import "../../utils/css/rating.css";
import { useEffect, useState } from 'react';

export default function Rating(props) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setRating(props.value);
    }, [props.value]); // Fix dependency warning by using props.value

    return (
        <>
            <div className="rating-box">
                {[...Array(5)].map((_, i) => (
                    <img
                        key={i}
                        className="rating-star filter-green"
                        src={i < rating ? star_full : star_empty}
                        alt="star"
                    />
                ))}
            </div>
        </>
    );
}