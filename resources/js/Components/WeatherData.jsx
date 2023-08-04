import React from 'react';
import { Row } from 'react-bootstrap';
import Value from './Value';
function WeatherData(props) {
    return <>
        <Row className='mt-5'>
            {props.values.map((value, e) => {
                return <Value 
                    key={e}
                    {...value}
                />
            })}
        </Row>
    </>
}

export default WeatherData;