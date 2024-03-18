import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Workout from './Workout';
import './home.css'

const Home = () => {

    const [data, setData] = useState([])

    const [filterdata, setFilterdata] = useState([])

    const [count, setCount] = useState(100)

    useEffect(() => {
        async function fetchdata() {
            const options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises',
                params: { limit: count },
                headers: {
                    'X-RapidAPI-Key': 'ef75754912msh197e010aa946b76p182927jsn3ffdd832791c',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setData(response.data)
                console.log(response.data);
                setFilterdata(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchdata()
    }, [count])


    const filter = (x) => {
        const temp = [...data];
        let filtering = temp.filter((e) => {
              return (
                e.bodyPart.toLowerCase().includes(x) || e.target.toLowerCase().includes(x) ||e.name.toLowerCase().includes(x)
              )
        })
        setFilterdata(filtering);
    }


    return (
        <>
            <h1>Exercise List</h1>
            <input onChange={(e) => {
                filter(e.target.value)
            }} type="text" name="" id="" />
            <section className='container'>
                {
                    filterdata.map((e,idx) => {
                        return (
                            <Workout
                                key={idx}
                                name={e.name}
                                part={e.bodyPart}
                                target={e.target}
                                img={e.gifUrl}
                            />
                        )
                    })
                }

            </section>
            <button onClick={() => {
                setCount((prev) => {
                    return prev + 10;
                })
            }}>Show More</button>

        </>
    )
}

export default Home
