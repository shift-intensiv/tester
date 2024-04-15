import * as z from 'zod';

export const phoneFormScheme = z.object({
  phone: z.string().min(11, {
    message: 'Поле обязательно для заполнения'
  })
});

export type PhoneFormScheme = z.infer<typeof phoneFormScheme>;
