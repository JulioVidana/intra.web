import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListaResguardosAcciones from "@/components/inventario/resguardos/ListaResguardosAcciones";
import { Resguardo } from "@/services/api/inventario-computo/models/Resguardos";
import * as hooks from "@/hooks/inventario/resguardos/useCreateEditResguardos";
import renderWithClient from "../../../__mock__/QueryClientProvider";

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: any) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuItem: ({ children, onClick }: any) => (
    <button onClick={onClick} data-testid="dropdown-item">
      {children}
    </button>
  ),
}));

jest.mock("@/hooks/inventario/resguardos/useCreateEditResguardos", () => ({
  useCreateEditResguardos: jest.fn(),
}));

describe("AccionesListaResguardos", () => {
  const mockResguardo: Resguardo = {
    id: 1,
    empleadoId: 101,
    empleado: "John Doe",
    notas: "Test notes",
    estatus: "Pendiente",
    createdBy: "admin",
    modifiedBy: "admin",
    fecha: new Date("2023-05-10"),
    created: new Date("2023-05-10T10:00:00"),
    modified: new Date("2023-05-10T10:00:00"),
  };

  const mockActualizarResguardo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (hooks.useCreateEditResguardos as jest.Mock).mockReturnValue({
      actualizarResguardo: mockActualizarResguardo,
      isUpdating: false,
      error: null,
    });
  });

  it("renderiza menú desplegable con opciones básicas", () => {
    renderWithClient(<ListaResguardosAcciones resguardo={mockResguardo} />);

    expect(screen.getByText("Imprimir")).toBeInTheDocument();
    expect(screen.getByText("Ver Detalles")).toBeInTheDocument();
    expect(screen.queryByText("Actualizar")).not.toBeInTheDocument();
  });

  it('muestra "Actualizar" solo cuando el estado es "Desactualizado"', () => {
    const desactualizadoResguardo = {
      ...mockResguardo,
      estatus: "Desactualizado",
    };

    renderWithClient(<ListaResguardosAcciones resguardo={desactualizadoResguardo} />);
    expect(screen.getByText("Actualizar")).toBeInTheDocument();
  });

  it('llama a actualizarResguardo al hacer clic en "Actualizar"', async () => {
    const desactualizadoResguardo = {
      ...mockResguardo,
      estatus: "Desactualizado",
    };

    renderWithClient(<ListaResguardosAcciones resguardo={desactualizadoResguardo} />);
    const updateButton = screen.getByText("Actualizar");

    await userEvent.click(updateButton);

    expect(mockActualizarResguardo).toHaveBeenCalledWith(desactualizadoResguardo);
  });
});
