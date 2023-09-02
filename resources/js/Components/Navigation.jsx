import React, { memo } from 'react';
import { Image, Navbar } from 'react-bootstrap';
import Moment from 'react-moment';

function Navigation(props) {
    return <>
        <Navbar expand="lg" collapseOnSelect>
            <Navbar.Brand>
                <Image 
                    src={`../images/pagasalogo.png`} 
                    width={80}
                    className='d-inline-block align-top'
                    style={{
                        color: 'white',
                        WebkitTextStroke: '1px #F8F8F8',
                        textShadow: '4px 2px 2px black'
                    }}
                />
                <Navbar.Text
                    className='d-inline-block align-bottom ml-4 font-bold'
                    style={{
                        color: 'white',
                        fontSize: '2em',
                        WebkitTextStroke: '1px #F8F8F8',
                        textShadow: '4px 2px 2px #045282'
                    }}
                >
                    Automatic Weather Station - {props.site}
                </Navbar.Text>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{color: 'white',
                        fontSize: '3em',
                        WebkitTextStroke: '1px #F8F8F8',
                        textShadow: '4px 2px 2px #045282'}}>
                    <Moment format="MMMM D YYYY, h:mm:ss A" interval={1000}/>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    </>
}

export default memo(Navigation);