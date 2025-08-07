'use server';

import {db} from "@/firebase/admin";
import {cookies} from "next/headers";
import {auth} from "firebase-admin";

export async function signUp(params: SignUpParams) {
    const {uid, name, email} = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please sign in instead.'
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return{
            success: true,
            message: 'User created successfully. Please sign in.',
        }
    } catch(e: any) {
        console.log('Error creating a user',e);

        if(c.code ==='auth/email-already-exists'){
            return {
                success: false,
                message : 'This email is already registered',
            }
        }

        return{
            success: false,
            message : 'Failed to create a user',
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: 60*60*24*7*1000,
    });

    cookieStore.set('session', sessionCookie, {
        maxAge: 60*60*24*7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    });
}

export async function signIn(params: SignInParams) {
    const {email, password} = params;

    try{
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return {
                success: false,
                message: 'User not found. Create an account Instead.'
            }
        }

        await setSessionCookie(idToken);
    } catch (e) {
        console.log(e);

        return {
            success: false,
            message: 'Failed to log into an account',
        }
    }
}