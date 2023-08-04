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
                />
                <Navbar.Text
                    className='d-inline-block align-bottom ml-4 font-bold'
                    style={{
                        fontSize:'2rem',
                        color:'#fff'
                    }}
                >
                    Automatic Weather Station - {props.site}
                </Navbar.Text>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{fontSize: '3rem', color:'#fff'}}>
                    <Moment format="MMMM D YYYY, h:mm:ss A" interval={1000}/>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    </>
}

export default memo(Navigation);