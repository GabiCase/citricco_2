import React from 'react'

import './Counter.css'



const Counter = ({ quantity, decrease, increase }) => {

    console.log('QUANTITY', { quantity })

    return (

        <div>{quantity &&

            <div className="def-number-input number-input">
                <button onClick={decrease} className="minus"></button>
                <input className="quantity" name="quantity" value={quantity} onChange={() => console.log('change')}
                    type="number" />
                <button onClick={increase} className="plus"></button>
            </div>
        }
        </div >


    )
}


export default Counter