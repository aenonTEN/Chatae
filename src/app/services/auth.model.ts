import { createUserWithEmailAndPassword } from 'firebase/auth';

export interface signinCredentials {
    email: string;
    password: string;

}

export interface SignUpCredentials extends signinCredentials{
    email: string;
    displayName: string;
    password: string;
}