import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col } from 'react-bootstrap';

function Value(props) {
    
    return <>
        <Col sm="3">
            <Card 
                className='mb-3'
                style={{
                    backgroundColor:'#00000040'
                }}
            >
                <Card.Title 
                    className='py-3'
                    style={{
                        textAlign:'center',
                        color:'white',
                        fontSize:'3rem'
                    }}
                >
                    <FontAwesomeIcon icon={props.icon} /> {props.name}
                </Card.Title>
                <Card.Body
                    style={{
                        backgroundColor:'#fff', 
                        opacity:.75, 
                        color:'black',
                        fontSize:'5rem',
                        textAlign:'center',
                        fontWeight:'bold'
                    }}
                >
                    {props.value ?? "--"} <span style={{fontSize:'3rem'}}>{props.units}</span>
                </Card.Body>
            </Card>
        </Col>
    </>
}

export default Value;