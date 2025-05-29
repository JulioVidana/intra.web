import React from 'react';
import { ResguardosColumns } from '../../../../src/components/inventario/resguardos/ListaResguardosTableColumns';
import { Resguardo } from '@/services/api/inventario-computo/models/Resguardos';
import { ColumnDef } from '@tanstack/react-table';

jest.mock('../../../../src/components/inventario/resguardos/ListaResguardosAcciones', () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-acciones" />
}));

describe('ColumnasTablaResguardos', () => {
  it('debe tener la estructura y accesores correctos', () => {
    expect(ResguardosColumns.length).toBe(5);
    
    expect(ResguardosColumns[0].id).toBe('select');
    expect((ResguardosColumns[1] as any).accessorKey).toBe('empleado');
    expect((ResguardosColumns[2] as any).accessorKey).toBe('notas');
    expect((ResguardosColumns[3] as any).accessorKey).toBe('estatus');
    expect(ResguardosColumns[4].id).toBe('actions');
  });

  it('debe tener los nombres de encabezado correctos', () => {
    expect((ResguardosColumns[1] as any).header).toBe('Empleado');
    expect((ResguardosColumns[2] as any).header).toBe('Notas');
  });
  
  it('debe tener renderizadores de celda apropiados', () => { 
    const mockResguardo: Resguardo = {
      id: 1,
      empleadoId: 101,
      empleado: 'John Doe',
      notas: 'Test notes',
      estatus: 'Pendiente',
      createdBy: 'admin',
      modifiedBy: 'admin',
      fecha: new Date('2023-05-10'),
      created: new Date('2023-05-10T10:00:00'),
      modified: new Date('2023-05-10T10:00:00')
    };
    
    const mockRow = {
      original: mockResguardo,
      getValue: (key: string) => {
        switch (key) {
          case 'empleado':
            return mockResguardo.empleado;
          case 'notas':
            return mockResguardo.notas;
          case 'estatus':
            return mockResguardo.estatus;
          default:
            return undefined;
        }
      },
      getIsSelected: () => false,
      toggleSelected: jest.fn()
    };
    
    const cellFn = (ResguardosColumns[1] as ColumnDef<Resguardo>).cell;
    if (cellFn && typeof cellFn === 'function') {
      const result = cellFn({ row: mockRow } as any);
      expect(result).toBeTruthy();
    }
    
    const notasCellFn = (ResguardosColumns[2] as ColumnDef<Resguardo>).cell;
    if (notasCellFn && typeof notasCellFn === 'function') {
      const result = notasCellFn({ row: mockRow } as any);
      expect(result).toBeTruthy();
    }
  });
}); 