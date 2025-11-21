'use client';

import {
  EnvelopeIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { loginAction } from './actions';

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

const initialState: LoginState = {
  ok: false,
  message: null,
  email: '',
  username: '',
  password: '',
  fieldErrors: {},
};

function SubmitButton({ locked }: { locked: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || locked}
      className="mt-4 w-full rounded-full bg-neutral-900 py-3.5 text-sm font-medium text-white disabled:bg-neutral-300"
    >
      {pending ? 'Loading...' : 'Login'}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(
    loginAction,
    initialState
  );

  const hasPasswordError = !!state.fieldErrors.password;
  const isSuccess = state.ok && !!state.message;

  return (
    <div className="w-full max-w-md rounded-3xl bg-white shadow-xl px-10 py-12 space-y-10">
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <FireIcon className="h-9 w-9 text-red-500" />
        </div>
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        {/* 이메일 */}
        <div className="space-y-1">
          <div className="flex items-center gap-3 rounded-full border bg-white px-5 py-3 text-sm border-neutral-200">
            <EnvelopeIcon className="h-6 w-6 text-gray-500" />
            <input
              name="email"
              type="email"
              className="input-field"
              placeholder="Email"
              defaultValue={state.email}
            />
          </div>
          {state.fieldErrors.email && (
            <p className="text-xs text-red-500 pl-4">
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        {/* 유저네임 */}
        <div className="space-y-1">
          <div className="flex items-center gap-3 rounded-full border bg-white px-5 py-3 text-sm border-neutral-200">
            <UserIcon className="h-6 w-6 text-gray-500" />
            <input
              name="username"
              type="text"
              className="input-field"
              placeholder="Username"
              defaultValue={state.username}
            />
          </div>
          {state.fieldErrors.username && (
            <p className="text-xs text-red-500 pl-4">
              {state.fieldErrors.username}
            </p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="space-y-1">
          <div
            className={`flex items-center gap-3 rounded-full border bg-white px-5 py-3 text-sm ${
              hasPasswordError
                ? 'border-red-400 bg-red-50 ring-2 ring-red-200'
                : 'border-neutral-200'
            }`}
          >
            <KeyIcon className="h-6 w-6 text-gray-500" />
            <input
              name="password"
              type="password"
              className="input-field"
              placeholder="Password"
            />
          </div>
          {state.fieldErrors.password && (
            <p className="text-xs text-red-500 pl-4">
              {state.fieldErrors.password}
            </p>
          )}
        </div>

        {/* 폼 전체 성공/실패 메시지 */}
        {state.message && (
          <p
            className={`text-xs pl-4 ${
              isSuccess ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {state.message}
          </p>
        )}

        <SubmitButton locked={state.ok} />
      </form>
    </div>
  );
}
