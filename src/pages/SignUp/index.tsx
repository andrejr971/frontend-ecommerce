import React, { useCallback, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { FiChevronLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationsErrors';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import { useAuth, IRequestSignUp } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';

import { Container, Content, Welcome, FormContent } from './styles';

const SignUp: React.FC = () => {
  const { signUp, isLoading, user } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IRequestSignUp) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('Email obrigatório'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signUp(data);

        history.push('/login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao criar a conta',
          description:
            'Pro favor, verifique as suas credenciais e tente novamente',
        });

        formRef.current?.clearField('password');
      }
    },
    [signUp, addToast, history],
  );

  return (
    <Container>
      <header>
        <Link to="/">
          <FiChevronLeft />
          Ir para loja
        </Link>
      </header>

      <Content>
        <div>
          <img src={logoImg} alt="logo DreShoes" />
        </div>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Welcome>
            <h1>Seja bem-vindo a plataforma</h1>
            <p>Faça o logon para poder usar a plataforma</p>
          </Welcome>

          <FormContent>
            <Input type="text" placeholder="Nome" name="name" icon={FiUser} />
            <Input
              type="text"
              placeholder="E-mail"
              name="email"
              icon={FiMail}
            />
            <InputPassword placeholder="Senha" name="password" icon={FiLock} />
            <InputPassword
              placeholder="Confirme a sua senha"
              name="password_confirmation"
              icon={FiLock}
            />
            <Button type="submit">
              {isLoading ? 'Carregando...' : 'Acessar'}
            </Button>

            <Link to="/login">Voltar ao login</Link>
          </FormContent>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUp;
