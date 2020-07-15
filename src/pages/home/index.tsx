import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

import api from '../../services/api';

import './style.css';

interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    document: string
}

const Home = () => {

    const [users, setUsers] = useState<User[]>();
    
    useEffect(() => {

        api.get('/users').then(response => {
            if (response) {
                setUsers(response.data);
            }
        });
    }, [])

    if (!users) {
        return <p>Carregando...</p>
    }

    return (
        <>
            <Container className="containerHome">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>E-mail</th>
                            <th>Document</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.document}</td>
                                <td><Button variant="primary" size="sm">Editar</Button></td>
                                <td><Button variant="danger" size="sm">Excluir</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default Home;