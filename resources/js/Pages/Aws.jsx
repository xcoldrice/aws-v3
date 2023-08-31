import Navigation from '@/Components/Navigation';
import WeatherData from '@/Components/WeatherData';
import Layout from '@/Layouts/Layout';
import { faBatteryFull, faCompass, faDroplet, faGauge, faSun, faTemperatureLow, faTemperatureQuarter, faWind } from '@fortawesome/free-solid-svg-icons';
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
            name: 'Battery',
            value : data.battVolt,
            units: 'V',
            icon: faBatteryFull
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
                        <Moment format='[as of] LLL'>{data.dateTime}</Moment>
                    </Card.Title>
                    <Card.Body
                        style={{
                            color:'white',
                            fontSize:'3rem',
                            textAlign:'center',
                            fontWeight:'bold'
                        }}
                    >
                        Accumulated rainfall from 12:01 AM: <Card.Text style={{color:'white',textShadow:' 0.0px 10.0px 0.02px #000, 9.8px 2.1px 0.02px #000, 4.2px -9.1px 0.02px #000, -8.0px -6.0px 0.02px #000, -7.6px 6.5px 0.02px #000, 4.8px 8.8px 0.02px #000, 9.6px -2.8px 0.02px #000, -0.7px -10.0px 0.02px #000, -9.9px -1.5px 0.02px #000, -3.5px 9.4px 0.02px #000, 8.4px 5.4px 0.02px #000, 7.1px -7.0px 0.02px #000, -5.4px -8.4px 0.02px #000, -9.4px 3.5px 0.02px #000, 1.4px 9.9px 0.02px #000, 10.0px 0.8px 0.02px #000, 2.9px -9.6px 0.02px #000, -8.7px -4.8px 0.02px #000, -6.6px 7.5px 0.02px #000, 5.9px 8.0px 0.02px #000, 9.1px -4.1px 0.02px #000, -2.1px -9.8px 0.02px #000, -10.0px -0.1px 0.02px #000, -2.2px 9.8px 0.02px #000, 9.1px 4.2px 0.02px #000, 6.1px -8.0px 0.02px #000, -6.5px -7.6px 0.02px #000, -8.8px 4.7px 0.02px #000, 2.7px 9.6px 0.02px #000, 10.0px -0.6px 0.02px #000, 1.5px -9.9px 0.02px #000, -9.3px -3.6px 0.02px #000, -5.5px 8.4px 0.02px #000, 7.0px 7.2px 0.02px #000, 8.5px -5.3px 0.02px #000, -3.4px -9.4px 0.02px #000, -9.9px 1.3px 0.02px #000, -0.8px 10.0px 0.02px #000, 9.6px 2.9px 0.02px #000, 4.9px -8.7px 0.02px #000, -7.5px -6.7px 0.02px #000, -8.1px 5.9px 0.02px #000, 4.0px 9.2px 0.02px #000, 9.8px -2.0px 0.02px #000, 0.2px -10.0px 0.02px #000, -9.7px -2.3px 0.02px #000, -4.3px 9.0px 0.02px #000, 7.9px 6.1px 0.02px #000',fontSize:'4rem',textAlign:'center',fontWeight:'bold'}}>{data?.otherParameters?.accumulated_rain_00UTC ?? 0}  </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
}

Aws.layout = page => <Layout children={page}/>
export default Aws;