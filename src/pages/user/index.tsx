import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import './style.css';

const User = () => {

    return (
        <>
            <Container className="containerUser">
                <Row style={{ marginBottom: '100px' }}>
                    <Col>Usuário</Col>
                </Row>
            </Container>
        </>
    );
}

export default User;