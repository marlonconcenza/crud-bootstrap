import React, { useState, useEffect, useRef } from 'react';
import { Col, Container, Form, Card, Button } from 'react-bootstrap';
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';

import './style.css';
import api from '../../services/api';
import { useFetch } from '../../hooks/useFetch';

interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    document: string
}

const User = ({ match }: RouteComponentProps) => {

    const history = useHistory();
    const { id, action } = useParams();

    const [validated, setValidated] = useState(false);
    const inputFirstName = useRef<HTMLInputElement>(null);
    const inputLastName = useRef<HTMLInputElement>(null);
    const inputEmail = useRef<HTMLInputElement>(null);
    const inputDocument = useRef<HTMLInputElement>(null);
    const isCreate = (action === "add");
    const isUpdate = (action === "update");
    const isRemove = (action === "remove");
    
    const { data } = useFetch<User>(`users/${id}`);

    if (!isCreate && !data) {
        return (
            <Container className="containerUser">
                Carregando...
            </Container>
        );
    }

    let userLabel: string;

    if (id > 0 && isUpdate) {
        userLabel = "Edição de Usuário";
    } else if (data && id > 0 && isRemove) {
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

            if(isCreate) {

                await api.post('/users', userForm).then((response) => {
                    if (response && response.data) {
                        history.push('/');
                    }
                })
                .catch((error) => {
                    alert(error);
                });

            } else if (isUpdate) {

                await api.put(`/users/${Number(id)}`, userForm).then((response) => {

                    if (response && response.data) {
                        history.push('/');
                    }
                })
                .catch((error) => {
                    alert(error);
                });

            } else {

                if (!window.confirm('Confirma a exclusão?')) return;

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
                                    defaultValue={data?.firstName}
                                    readOnly={isRemove}
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
                                    defaultValue={data?.lastName}
                                    readOnly={isRemove}
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
                                    defaultValue={data?.email}
                                    readOnly={isRemove}
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
                                    defaultValue={data?.document}
                                    readOnly={isRemove}
                                    maxLength={11}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório
                                </Form.Control.Feedback>
                            </Col>
                        </Card.Body>
                        <Card.Footer>
                            <Button type="submit" variant={isRemove ? "danger" : "success"}>
                                {isRemove ? "Excluir" : "Salvar"}
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