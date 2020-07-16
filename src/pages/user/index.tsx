import React, { useState, useEffect, useRef } from 'react';
import { Col, Container, Form, Card, Button } from 'react-bootstrap';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import './style.css';
import api from '../../services/api';

interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    document: string
}

const User = ({ match }: RouteComponentProps) => {

    const history = useHistory();

    const [user, setUser] = useState<User>();
    const [validated, setValidated] = useState(false);

    const inputFirstName = useRef<HTMLInputElement>(null);
    const inputLastName = useRef<HTMLInputElement>(null);
    const inputEmail = useRef<HTMLInputElement>(null);
    const inputDocument = useRef<HTMLInputElement>(null);

    const { id, action } = match.params as any;
    let userLabel: string;

    useEffect(() => {
        if (action !== "add" && id > 0) {
            api.get(`/users/${id}`).then(response => {
                if (response) {
                    setUser(response.data);
                }
            });
        }
    }, [action, id]);

    if (action !== "add" && !user) {
        return (
            <Container className="containerUser">
                Carregando...
            </Container>
        );
    }

    if (id > 0 && action === "update") {
        userLabel = "Edição de Usuário";
    } else if (user && id > 0 && action === "remove") {
        userLabel = "Exclusão de Usuário";
    } else {
        userLabel = "Criação de Usuário";
    }

    const handleBack = () => {
        history.push('/');
    }

    const handleSubmit = async (event: any) => {
        if (event) event.preventDefault();

        setValidated(true);

        if (event.currentTarget.checkValidity()) {

            const userForm = {
                id: Number(id),
                firstName: inputFirstName.current?.value,
                lastName: inputLastName.current?.value,
                email: inputEmail.current?.value,
                document: inputDocument.current?.value
            };

            if(action === "add") {

                await api.post('/users', userForm).then((response) => {

                    if (response && response.data) {
                        history.push('/');
                    }
                })
                .catch((error) => {
                    alert(error);
                });

            } else if (action === "update") {

                await api.put(`/users/${Number(id)}`, userForm).then((response) => {

                    if (response && response.data) {
                        history.push('/');
                    }
                })
                .catch((error) => {
                    alert(error);
                });

            } else {
                await api.delete(`/users/${Number(id)}`).then((response) => {

                    if (response) {
                        history.push('/');
                    }
                })
                .catch((error) => {
                    alert(error);
                });
            }   
        }
    }

    return (
        <>
            <Container className="containerUser">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Card>
                        <Card.Header>{userLabel}</Card.Header>
                        <Card.Body>
                            <Col>
                                <Form.Label htmlFor="inputFirstName">Primeiro Nome</Form.Label>
                                <Form.Control
                                    id="inputFirstName"
                                    ref={inputFirstName}
                                    placeholder="Digite o seu primeiro nome"
                                    type="text"
                                    size="sm"
                                    required
                                    defaultValue={user?.firstName}
                                    readOnly={action==="remove"}
                                    maxLength={50}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="inputLastName">Sobrenome</Form.Label>
                                <Form.Control
                                    id="inputLastName"
                                    ref={inputLastName}
                                    placeholder="Digite o seu sobrenome"
                                    type="text"
                                    size="sm"
                                    required
                                    defaultValue={user?.lastName}
                                    readOnly={action==="remove"}
                                    maxLength={50}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="inputEmail">E-mail</Form.Label>
                                <Form.Control
                                    id="inputEmail"
                                    ref={inputEmail}
                                    placeholder="Digite o seu e-mail"
                                    type="email"
                                    size="sm"
                                    required
                                    defaultValue={user?.email}
                                    readOnly={action==="remove"}
                                    maxLength={50}
                                />
                                <Form.Control.Feedback type="invalid">
                                    E-mail inválido
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="inputDocument">CPF</Form.Label>
                                <Form.Control
                                    id="inputDocument"
                                    ref={inputDocument}
                                    placeholder="Digite o seu CPF"
                                    type="number"
                                    size="sm"
                                    required
                                    defaultValue={user?.document}
                                    readOnly={action==="remove"}
                                    maxLength={11}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório
                                </Form.Control.Feedback>
                            </Col>
                        </Card.Body>
                        <Card.Footer>
                            <Button type="submit" variant={action === "remove" ? "danger" : "success"}>
                                {action === "remove" ? "Excluir" : "Salvar"}
                            </Button>&nbsp;&nbsp;
                            <Button type="button" variant="primary" onClick={() => handleBack()}>
                                Voltar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Form>
            </Container>
        </>
    );
}

export default User;