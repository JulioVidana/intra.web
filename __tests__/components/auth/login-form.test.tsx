import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '@/components/auth/login-form'
import { API } from '@/services/api/API'
import { useRouter } from 'next/navigation'
import renderWithClient from '../../__mock__/QueryClientProvider'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/services/api/API', () => ({
  API: {
    auth: {
      authenticate: jest.fn(),
    },
  },
}))

// Mock useAuth hook
jest.mock('@/hooks/auth/useAuth', () => {
  let isLoading = false;
  let submitCallback: ((data: any) => void) | null = null;

  return {
    __esModule: true,
    default: () => {
      const router = useRouter();
      return {
        isLoginLoading: isLoading,
        handleSubmit: (cb: any) => {
          submitCallback = cb;
          return async (e: any) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              email: formData.get('email'),
              password: formData.get('password'),
            };
            isLoading = true;
            if (submitCallback) {
              await submitCallback(data);
              router.push('/');
            }
          };
        },
        methods: {},
        onSubmit: async (data: any) => {
          await API.auth.authenticate(data);
        },
      };
    },
  };
});

jest.mock('@/components/hook-form/FormProvider', () => ({
  __esModule: true,
  default: ({ children, onSubmit, ...props }: any) => (
    <form role="form" onSubmit={onSubmit} {...props}>{children}</form>
  ),
}))

jest.mock('@/components/hook-form/RHFTextField', () => ({
  __esModule: true,
  default: (props: any) => (
    <input
      aria-label={props.label}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type || 'text'}
    />
  ),
}))

jest.mock('lucide-react', () => ({
  Mail: () => <svg data-testid="icon-mail" />,
  LockKeyhole: () => <svg data-testid="icon-lock" />,
}))

describe('LoginForm', () => {
  const pushMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: pushMock })
  })

  it('renderiza los campos de email, contraseña y el botón', () => {
    renderWithClient(<LoginForm />)

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('permite ingresar datos y hace login exitoso', async () => {
    ;(API.auth.authenticate as jest.Mock).mockResolvedValue({
      success: true,
      user: { id: '1', email: 'test@example.com' },
    })

    renderWithClient(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: '123456' },
    })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(API.auth.authenticate).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: '123456',
      })
    })

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/')
    })
  })

})
