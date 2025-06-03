import React from 'react';
import { render } from '@testing-library/react';
import DocumentoResguardo from '@/reports/inventario-computo/documento-resguardo';
import { Resguardo, ResguardoStatus } from '@/services/api/inventario-computo/models/Resguardos';
import { Equipos } from '@/services/api/inventario-computo/models/Equipos';



const mockEquipos: Equipos[] = [
  {
    id: 1,
    statusId: 1,
    statusNombre: 'Activo',
    tiposEquiposId: 1,
    tipoEquipoNombre: 'Laptop',
    subEquiposId: 1,
    subEquipoNombre: 'Dell',
    claveSIIF: 'SIIF001',
    descripcion: 'Laptop Dell XPS 15',
    clave: 'EQ001',
    numSerie: 'SN123456',
    observaciones: 'Equipo nuevo',
    caracteristicas: '16GB RAM, 512GB SSD',
    ubicacion: 'Oficina principal',
    fechaBaja: '',
    createdBy: 'admin',
    modifiedBy: 'admin',
    created: '2024-03-20',
    modified: '2024-03-20',
    isAsignado: true,
    empleadoAsignado: 'Juan Pérez',
    departamentoEmpleadoAsignado: 'TI',
    factura: 'FAC001',
    fechaFactura: '2024-01-01',
    valor: 25000
  },
  {
    id: 2,
    statusId: 1,
    statusNombre: 'Activo',
    tiposEquiposId: 2,
    tipoEquipoNombre: 'Monitor',
    subEquiposId: 2,
    subEquipoNombre: 'HP',
    claveSIIF: 'SIIF002',
    descripcion: 'Monitor HP 27"',
    clave: 'EQ002',
    numSerie: 'SN789012',
    observaciones: 'Equipo nuevo',
    caracteristicas: '4K, 60Hz',
    ubicacion: 'Oficina principal',
    fechaBaja: '',
    createdBy: 'admin',
    modifiedBy: 'admin',
    created: '2024-03-20',
    modified: '2024-03-20',
    isAsignado: true,
    empleadoAsignado: 'Juan Pérez',
    departamentoEmpleadoAsignado: 'TI',
    factura: 'FAC002',
    fechaFactura: '2024-01-01',
    valor: 5000
  }
];

const mockResguardo: Resguardo = {
  id: 1,
  empleadoId: 12345,
  empleado: 'Juan Pérez',
  notas: 'Equipo asignado para trabajo diario',
  equipos: mockEquipos,
  estatus: ResguardoStatus.Archivado,
  nombreDoc: 'resguardo_12345.pdf',
  createdBy: 'admin',
  modifiedBy: 'admin',
  fecha: new Date('2024-03-20'),
  created: new Date('2024-03-20'),
  modified: new Date('2024-03-20')
};

describe("DocumentoResguardo", () => {
  it("renderiza correctamente el documento PDF con los datos esperados", () => {
    const { getByText } = render(<DocumentoResguardo resguardo={mockResguardo} />);

    expect(getByText(/Resguardo de Equipo Informático/i)).toBeInTheDocument();
    expect(getByText(/Empleado No. 12345/i)).toBeInTheDocument();
    expect(getByText(/Laptop Dell XPS 15/i)).toBeInTheDocument();
    expect(getByText(/Monitor HP 27"/i)).toBeInTheDocument();
  });
});
