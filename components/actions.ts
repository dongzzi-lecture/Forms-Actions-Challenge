'use server';

type LoginState = { ok: boolean; message: string | null };

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get('password');

  if (password === '12345') {
    return { ok: true, message: '로그인에 성공했습니다.' };
  }

  return { ok: false, message: 'Wrong password' };
}
