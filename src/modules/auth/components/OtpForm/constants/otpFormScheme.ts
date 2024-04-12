import * as z from 'zod';

export const otpFormScheme = z.object({
  otp: z.string().min(6, {
    message: 'Поле обязательно для заполнения'
  })
});

export type OtpFormScheme = z.infer<typeof otpFormScheme>;
