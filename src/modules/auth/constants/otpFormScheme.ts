import * as z from 'zod';

export const otpFormScheme = z.object({
  otp: z
    .string()
    .min(1, {
      message: 'Поле обязательно для заполнения'
    })
    .refine((data) => data.trim().length >= 6, {
      message: 'Код должен содержать 6 цифр'
    })
});

export type OtpFormScheme = z.infer<typeof otpFormScheme>;
