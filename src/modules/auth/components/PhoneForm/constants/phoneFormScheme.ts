import * as z from 'zod';

export const phoneFormScheme = z.object({
  phone: z.string().min(10, {
    message: 'Поле обязательно для заполнения'
  })
});

export type PhoneFormScheme = z.infer<typeof phoneFormScheme>;
