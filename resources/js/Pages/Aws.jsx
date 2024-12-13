import Navigation from '@/Components/Navigation';
import WeatherData from '@/Components/WeatherData';
import Layout from '@/Layouts/Layout';
import { faBatteryFull, faCompass, faDroplet, faGauge, faSun, faTemperatureLow, faTemperatureQuarter, faWind, faFire } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
function Aws(props) {
    const [data, setData] = useState({});

    async function getData(id) {
        const token = btoa('user:pass')
        return await fetch(`https://api.meteopilipinas.gov.ph/v1/weatherstation`, {
            headers: {
                authorization: 'Basic ' + token
            }
        })
        .then(res => res.ok && res.json())
        .then(res => {
            if(!res.error) {
                let found = res.result.filter(aws => aws.siteID == props.id);

                if(found.length > 0) {
                    setData(res.result.filter(aws => aws.siteID == props.id)[0])
                }
            }
        })
    }
    
    useLayoutEffect(() => {
        getData(props.id);
        let interval = setInterval(() => {
            getData(props.id);
        }, (5 * 60 * 1000));

        return () => {
            clearInterval(interval);
        }

    }, []);
    
    function getDirection(angle) {
        let  index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8
        return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][index];
    }

    let arr = [
        {
            name: 'Temperature',
            value: data.currentTemp,
            units: '°C',
            icon: faTemperatureLow
        },
        {
            name: 'Wind Direction',
            value: getDirection(data.windDirection),
            units: '',
            icon: faCompass
        },
        {
            name: 'Wind Speed',
            value: data.windSpeed,
            units: 'm/s',
            icon: faWind
        },
        {
            name: 'Pressure',
            value:data.currentPres,
            units: 'HPa',
            icon: faGauge
        },
        {
            name: 'Precipitation',
            value: data.minute30Rain,
            units: 'mm',
            icon: faDroplet
        },
        {
            name: 'Solar Radiation',
            value: data.currentSolar,
            units: 'wm2',
            icon: faSun
        },
        {
            name: 'Humidity',
            value: data.currentHum,
            units: '%',
            icon: faTemperatureQuarter
        },
        {
            name: 'Heat Index',
            value : data?.otherParameters?.heat_index,
            units: '°C',
            icon: faFire
        },
    ]
    return <>
        <Navigation site={data.siteName}/>
        <WeatherData values={arr}/>
        <Row>
            <Col sm={{span:6, offset:3}}>
                <Card 
                    style={{
                        backgroundColor:'#00000040'
                    }}
                >
                    <br/>
                    <br/>
                    <Card.Title
                        className='py-2'
                        style={{
                            textAlign:'center',
                            color:'white',
                            fontSize:'3rem'
                        }}
                    >
                        BATTERY: { data.battVolt} <br />
                        <Moment format='[data as of] LLL'>{data.dateTime}</Moment>
                    </Card.Title>
                    <Card.Body
                        style={{
                            color:'white',
                            fontSize:'3rem',
                            textAlign:'center',
                            fontWeight:'bold'
                        }}
                    >
                        Accumulated rainfall from 12:01 AM:<Card.Text style={{color:'white',  WebkitTextStroke: '1px #F8F8F8',textShadow: '4px 2px 2px #045282',letterSpacing: '0.3em',fontSize:'5rem',textAlign:'center',fontWeight:'bold'}}>{ data?.otherParameters?.accumulated_rain_00UTC ?? 0} mm </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
}


Aws.layout = page => <Layout children={page}/>
export default Aws;




