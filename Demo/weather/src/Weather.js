import React from 'react';
import axios from 'axios';
import { TiWeatherSunny } from "react-icons/ti";
import { GiSunrise } from "react-icons/gi";
import { useState } from 'react';
import './Weather.css';
import './App.css';

const itemjson = [
    {
        time: '12PM',
        degree: 19
    },
    {
        time: 'Now',
        degree: 20
    },
    {
        time: '2PM',
        degree: 22
    },
    {
        time: '3PM',
        degree: 20
    },
    {
        time: '4PM',
        degree: 19
    },
];
function Weather() {
    const [data, setData] = useState(
        {
            celcius: 10,
            name: 'London',
            humidity: 10,
            speed: 2,
            image: '/Images/cloud.png'
        })

    // please install npm install axios before use

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3b846043eb83eb3923a37eacb5b55cbf&&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    let imagepath = '';
                    if (res.data.weather[0].main === "Clouds") {
                        imagepath = "/Images/cloud.png"
                    }
                    else if (res.data.weather[0].main === "Clear") {
                        imagepath = "/Images/clear.png"
                    }
                    else if (res.data.weather[0].main === "Rain") {
                        imagepath = "/Images/cloud_rain.png"
                    }
                    else if (res.data.weather[0].main === "Drizzle") {
                        imagepath = "/Images/drizzle.png"
                    }
                    else if (res.data.weather[0].main === "Mist") {
                        imagepath = "/Images/mist.png"
                    }
                    else {

                        imagepath = "/Images/cloud.png"
                    }
                    console.log(res.data);
                    setData({
                        ...data, celcius: res.data.main.temp, name: res.data.name,
                        humidity: res.data.main.humidity, speed: res.data.wind.speed,
                        image: imagepath
                    })
                    setError('');
                })
                .catch(err => {
                    if (err?.response.status === 404) {
                        setError("Invalid city Name");
                    }
                    else {
                        setError('');
                    }
                    console.log(err)
                });
        }
    }

    return (
        <>

            <div className="container ">
                <div style={{ display: 'flex' }}>

                    <div className="weather">
                        <div className="search">
                            <input type="text" placeholder="Enter City Name" onChange={e => setName(e.target.value)} />
                            <button><img src="/Images/search.png" alt="weather" onClick={handleClick} /></button>
                        </div>
                        <div className='error'>
                            <p>{error}</p>
                        </div>
                        <div className="winfo">
                            <img style={{ "width": "100px" }} src={data.image} alt="cloud" />
                            <h1>{Math.round(data.celcius)}°C</h1>
                            <h2>{data.name}</h2>
                            <div className="details">
                                <div className="col">
                                    <img src="/Images/humidity.png" alt="Humidity" />
                                    <div className="humidity">
                                        <p>{Math.round(data.humidity)}%</p>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <img src="/Images/wind.png" alt="Humidity" />
                                    <div className="wind">
                                        <p>{Math.round(data.speed)}</p>
                                        <p>Wind</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='box'>
                    <span><b>Bengaluru</b></span>
                    <br />
                    <span>19 | Most Clear</span>
                    <br />
                    <hr />
                    <span style={{ paddingRight: '30px' }}>Hourly forecast</span>
                    <span style={{ paddingLeft: '30px' }}>Weekly forecast</span>
                    <hr />
                    <div style={{ "display": "flex" }}>
                        {
                            itemjson.map(function (item, index) {
                                return (<div key={index} className="root" style={{ "marginRight": "5px", "paddingRight": "12px" }}>
                                    <div>

                                        <p style={{ 'fontSize': '18px', 'paddingLeft': '12px' }} >{item.time}</p>
                                        <p style={{ "marginLeft": "10px" }}><img width="40px" height="40px" src="https://img.icons8.com/color/48/partly-cloudy-rain--v1.png" alt="partly-cloudy-rain--v1" /></p>
                                        <p style={{ "fontSize": '20px', 'paddingLeft': '15px' }}>{item.degree}</p>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                    <div className='box1'>
                        <p style={{ paddingRight: '230px' }}><TiWeatherSunny /> Air Quality</p>
                        <p style={{ paddingRight: '150px' }}>3 Low-Health Quality</p>
                        <p style={{ paddingRight: '260px' }}>See more</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }} >


                        <div className="box2" style={{ width: '50%' }}>

                            <span style={{ paddingRight: '70px', marginTop: '1px', fontSize: '17px' }}><TiWeatherSunny />UV INDEX</span>
                            <h3 style={{ paddingRight: '140px', marginTop: '25px', marginBottom: '0px' }}>4</h3>
                            <span style={{ paddingRight: '60px' }}>Modearte</span>
                        </div>
                        <div className="box3" style={{ width: '50%' }}>
                            <span style={{ paddingRight: '60px' }}><GiSunrise />sunrise</span>
                            <h1 style={{ marginTop: '7px' }}>5:28 AM</h1>
                            <hr />
                            <span style={{ paddingBottom: '4px', fontSize: '17px' }}>Sunset: 7:25PM</span>
                        </div>
                    </div>

                </div >
            </div>

        </>
    );
}

export default Weather;