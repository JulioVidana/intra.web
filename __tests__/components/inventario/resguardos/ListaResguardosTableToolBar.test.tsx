import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListaResguardosTableToolBar from '../../../../src/components/inventario/resguardos/ListaResguardosTableToolBar';

describe('BarraHerramientasTablaListaResguardos', () => {
  const mockHandleSearchChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza con el campo de entrada de búsqueda', () => {
    render(
      <ListaResguardosTableToolBar 
        search="" 
        handleSearchChange={mockHandleSearchChange} 
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Buscar...');
    expect(searchInput).toBeInTheDocument();
  });

  it('muestra el valor actual de la búsqueda', () => {
    const searchValue = 'test search';
    
    render(
      <ListaResguardosTableToolBar 
        search={searchValue} 
        handleSearchChange={mockHandleSearchChange} 
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Buscar...') as HTMLInputElement;
    expect(searchInput.value).toBe(searchValue);
  });

  it('llama a handleSearchChange cuando cambia el valor de entrada', () => {
    render(
      <ListaResguardosTableToolBar 
        search="" 
        handleSearchChange={mockHandleSearchChange} 
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Buscar...');
    
    fireEvent.change(searchInput, { target: { value: 'new search' } });
    
    expect(mockHandleSearchChange).toHaveBeenCalledWith('new search');
  });

  it('tiene el icono de búsqueda', () => {
    render(
      <ListaResguardosTableToolBar 
        search="" 
        handleSearchChange={mockHandleSearchChange} 
      />
    );
    
    const iconContainer = document.querySelector('.pointer-events-none');
    expect(iconContainer).toBeInTheDocument();
  });
}); 