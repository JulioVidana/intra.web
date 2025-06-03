import { render, screen } from '@testing-library/react'
import LoginPage from '@/app/(auth)/login/page'

jest.mock('next/headers', () => ({
  cookies: () => ({
    get: () => null
  })
}))

jest.mock('@/components/auth/login-form', () => ({
  LoginForm: () => <div data-testid="login-form">LoginForm</div>,
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}))

describe('LoginPage', () => {
  it('renderiza el encabezado y el formulario de login', async () => {
    const LoginPageComponent = await LoginPage()
    render(LoginPageComponent)

    const text = screen.getByText('Inicia sesión para continuar')
    expect(text).toBeInTheDocument()
    expect(screen.getByTestId('login-form')).toBeInTheDocument()
  })
})
