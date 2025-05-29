import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '@/components/auth/login-form'
import { API } from '@/services/api/API'
import { useRouter } from 'next/navigation'

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
    render(<LoginForm />)

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('permite ingresar datos y hace login exitoso', async () => {
    ;(API.auth.authenticate as jest.Mock).mockResolvedValue({ token: 'fake-token' })

    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(API.auth.authenticate).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: '123456',
      })
      expect(pushMock).toHaveBeenCalledWith('/')
    })
  })

})
