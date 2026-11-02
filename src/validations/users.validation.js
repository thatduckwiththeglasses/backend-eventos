import { z } from 'zod';

export const createUserSchema = z.object({
    first_name: z.string().min(2, 'El nombre es obligatorio'),
    last_name: z.string().min(2, 'El apellido es obligatorio'),
    email: z.string().min(10, 'El correo es obligatorio'),
    password: z.string().min(8, 'La contraseña es obligatoria (8 caracteres minimo)'),
});

export const updateUserSchema = createUserSchema.partial();