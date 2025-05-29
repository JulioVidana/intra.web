import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import TipoEquipoForm from "@/components/inventario/catalogos/tipoEquipos/TipoEquipoForm";
import { useCreateEditTipoEquipos } from "@/hooks/inventario/catInventario/useCreateEditTipoEquipos";

// Mock del hook
jest.mock("@/hooks/inventario/catInventario/useCreateEditTipoEquipos");

const mockUseCreateEditTipoEquipos = useCreateEditTipoEquipos as jest.Mock;

describe("TipoEquipoForm", () => {
  const Wrapper = ({ isEdit, isPending }: { isEdit: boolean; isPending: boolean }) => {
    mockUseCreateEditTipoEquipos.mockReturnValue({
      methods: useForm(),
      onSubmit: jest.fn(),
      handleSubmit: (fn: any) => fn,
      isPending,
      isEdit,
    });

    return <TipoEquipoForm />;
  };

  it('muestra "Guardar" cuando isEdit es false', () => {
    render(<Wrapper isEdit={false} isPending={false} />);
    expect(screen.getByRole("button")).toHaveTextContent("Guardar");
  });

  it('muestra "Actualizar" cuando isEdit es true', () => {
    render(<Wrapper isEdit={true} isPending={false} />);
    expect(screen.getByRole("button")).toHaveTextContent("Actualizar");
  });

  it('muestra "Guardando..." y desactiva el botón cuando isPending es true', () => {
    render(<Wrapper isEdit={true} isPending={true} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Guardando...");
    expect(button).toBeDisabled();
  });
});
