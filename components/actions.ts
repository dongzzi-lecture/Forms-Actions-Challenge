'use server';

import { z } from 'zod';

type LoginState = {
  ok: boolean;
  message: string | null;
  email: string;
  username: string;
  password: string;
  fieldErrors: {
    email?: string;
    username?: string;
    password?: string;
  };
};

const loginSchema = z.object({
  email: z
    .string()
    .email('올바른 이메일 형식이 아닙니다.')
    .endsWith('@zod.com', '오직 @zod.com 이메일만 허용됩니다.'),
  username: z.string().min(5, '유저명은 5글자 이상이어야 합니다.'),
  password: z
    .string()
    .min(10, '비밀번호는 10글자 이상이어야 합니다.')
    .regex(/\d/, '비밀번호에는 숫자가 최소 1개 포함되어야 합니다.'),
});

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const raw = {
    email: (formData.get('email') ?? '') as string,
    username: (formData.get('username') ?? '') as string,
    password: (formData.get('password') ?? '') as string,
  };

  const result = loginSchema.safeParse(raw);

  if (!result.success) {
    const flat = result.error.flatten().fieldErrors;

    const fieldErrors: LoginState['fieldErrors'] = {
      email: flat.email?.[0],
      username: flat.username?.[0],
      password: flat.password ? flat.password.join(' ') : undefined,
    };

    return {
      ok: false,
      message: '폼을 다시 확인해주세요.',
      email: raw.email,
      username: raw.username,
      password: raw.password,
      fieldErrors,
    };
  }

  return {
    ok: true,
    message: '가입/로그인에 성공했습니다.',
    email: result.data.email,
    username: result.data.username,
    password: result.data.password,
    fieldErrors: {},
  };
}
