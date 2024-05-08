'use server'

import { SignupFormSchema, FormState } from "../definisions"
import prisma from "../prismaClient"

const bcrypt = require('bcrypt')

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { name, email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log(name, email, hashedPassword)

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            },
        })
        console.log('new user created', newUser)
    } catch (error: any) {
        console.log('cannot create user', error.message);
    }

    

    // Call the provider or db to create a user...
}