import React from 'react'
import './workout.css'

const Workout = ({ name, part, target, img }) => {
    return (
        <div className='main'>
            <div>
                <img src={img} alt="" />
            </div>
            <h3>{name}</h3>
            <p>{part}</p>
            <p>{target}</p>
        </div>
    )
}

export default Workout
