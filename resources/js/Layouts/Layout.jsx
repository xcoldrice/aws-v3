import { Head } from '@inertiajs/react';
import React from 'react';
import { Container, Image } from 'react-bootstrap';
function Layout(props) {
    return <Container fluid className='background'>
        <Head title={props.title}/>
        {props.children}
    </Container>
}

export default Layout;