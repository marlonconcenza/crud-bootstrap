import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Table, Button, Row } from 'react-bootstrap';

import { useFetch } from '../../hooks/useFetch';
import './style.css';

interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    document: string
}

const Home = () => {

    const history = useHistory();
    const { data } = useFetch<User[]>('users');

    const handleClick = (action: string, id?: number) => {

        if (id && id > 0) {
            history.push(`/users/${action}/${id}`);
        }
        else {
            history.push(`/users/${action}`);
        }
    };

    if (!data) {
        return (
            <Container className="containerHome">
                <p>Carregando...</p>
            </Container>
        );
    }

    return (
        <>
            <Container className="containerHome">
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>E-mail</th>
                                <th>CPF</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.document}</td>
                                    <td><Button variant="primary" size="sm" onClick={() => handleClick('update', user.id)}>Editar</Button></td>
                                    <td><Button variant="danger" size="sm" onClick={() => handleClick('remove', user.id)}>Excluir</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <Button variant="success" size="sm" onClick={() => handleClick('add')}>Novo usuário</Button>
                </Row>
            </Container>
        </>
    );
}

export default Home;