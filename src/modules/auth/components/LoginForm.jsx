import React, { useEffect } from 'react';
import { addToast, Button, Form, Input } from '@heroui/react';
import { MailIcon } from '../utils/IconMail';
import { PasswordIcon } from '../utils/IconPassword';
import { LoginInfo } from './LoginInfo';
import { useAuthStore } from '../hooks/useAuthStore';
import { useForm } from '../../../hooks/useForm';


const loginFormField = {
    emailLogin: "",
    passwordLogin: ""
}

export const LoginForm = () => {
    const { startLogin, errorMessage} = useAuthStore();
    const { emailLogin, passwordLogin, onInputChange } = useForm( loginFormField )

    const handleSubmit = (e) => {
        e.preventDefault();
        startLogin({ email: emailLogin, password: passwordLogin})
    }

    useEffect(() => {
        if(errorMessage) {
            addToast({
                title: 'Error',
                description: errorMessage || 'Ocurrió un error',
                color: 'danger',
            });
        }
    }, [errorMessage])
    

    return (
        <div className="flex h-screen">
            <LoginInfo />
            <div className="w-1/2 flex justify-center items-center mt-32">
                <div className="max-w-xs  w-full">
                    <h2 className="text-2xl w-auto text-start font-bold">
                        Iniciar sesión 
                    </h2>
                    <p className="text-start text-gray-500 mb-6">
                        Accede para gestionar tus productos y pedidos
                    </p>

                    <Form onSubmit={handleSubmit} className="w-full max-w-xs grid gap-4">
                        <Input
                            label="Email"
                            labelPlacement="outside"
                            placeholder="you@example.com"
                            endContent={
                                <MailIcon className="text-2xl text-default-400 pointer-events-none rounded-sm flex-shrink-0" />
                            }
                            type="email"
                            variant="bordered"
                            color="primary"
                            name='emailLogin'
                            value={emailLogin}
                            onChange={onInputChange}
                            required={true}
                        />
                        <Input
                            label="Contraseña"
                            labelPlacement="outside"
                            type="password"
                            name="passwordLogin"
                            placeholder="Ingresa tu contraseña"
                            endContent={
                                <PasswordIcon className="text-2xl text-default-400 pointer-events-none rounded-md flex-shrink-0" />
                            }
                            variant="bordered"
                            color="primary"
                            value={passwordLogin}
                            onChange={onInputChange}
                            required={true}


                        />
                        <Button type="submit" color="primary" className="w-full rounded-md">
                            Iniciar sesión
                        </Button>
                    </Form>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        ¿Nuevo en ProductPro? <a href="#" className="text-blue-600 font-semibold">Crea una cuenta</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
