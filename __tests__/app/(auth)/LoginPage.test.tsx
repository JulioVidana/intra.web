import { render, screen } from '@testing-library/react'
import LoginPage from '@/app/(auth)/login/page'

jest.mock('@/components/auth/login-form', () => ({
  LoginForm: () => <div data-testid="login-form">LoginForm</div>,
}))

describe('LoginPage', () => {
  it('renderiza el encabezado y el formulario de login', () => {
    render(<LoginPage />)

    expect(screen.getByText('Bienvenido')).toBeInTheDocument()
    expect(screen.getByText('Inicia sesión para continuar')).toBeInTheDocument()
    expect(screen.getByTestId('login-form')).toBeInTheDocument()
  })
})
