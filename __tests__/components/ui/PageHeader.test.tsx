import { render, screen } from '@testing-library/react'
import PageHeader from '@/components/layout/PageHeader'
import React from 'react'


jest.mock('@/components/layout/Breadcrumbs', () => ({
  __esModule: true,
  default: ({ links }: { links: { name: string; href: string }[] }) => (
    <nav>
      {links.map((link, index) => (
        <a key={index} href={link.href}>
          {link.name}
        </a>
      ))}
    </nav>
  ),
}))

describe('PageHeader', () => {
  const mockLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
  ]

  const mockSubHeading = [
    {
      icon: <span data-testid="icon">🔧</span>,
      text: 'Configuración',
    },
  ]

  it('renderiza el heading', () => {
    render(<PageHeader links={mockLinks} heading="Mi Título" />)
    expect(screen.getByText('Mi Título')).toBeInTheDocument()
  })

  it('renderiza los breadcrumbs', () => {
    render(<PageHeader links={mockLinks} heading="Mi Título" />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renderiza los subheadings si existen', () => {
    render(<PageHeader links={mockLinks} heading="Mi Título" subHeading={mockSubHeading} />)
    expect(screen.getByText('Configuración')).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renderiza la acción si existe', () => {
    const actionElement = <button>Acción</button>
    render(<PageHeader links={mockLinks} heading="Mi Título" action={actionElement} />)
    expect(screen.getByText('Acción')).toBeInTheDocument()
  })
})
