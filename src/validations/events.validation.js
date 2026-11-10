import { date, z } from 'zod';

export const createEventSchema = z.object({
    title: z.string().min(2, 'El nombre es obligatorio'),
    description: z.string().min(5, 'La descripción es obligatoria'),
    category: z.string().min(2, 'La categoria es obligatoria'),
    date: z.date(),
    location: z.string().min(3,'La locacion del evento es obligatoria'),
    capacity: z.number().min(1, 'La capacidad tiene que ser de almenos 1 cliente'), 
    price: z.number().min(0, 'El precio no puede ser negativo'),
});

export const updateEventSchema = createEventSchema.partial();