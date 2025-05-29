import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import EquipoForm from "@/components/inventario/equipos/EquipoForm";
import { useCreateEditEquipos } from "@/hooks/inventario/equipos/useCreateEditEquipos";

jest.mock("@/hooks/inventario/equipos/useCreateEditEquipos");

const mockUseCreateEditEquipos = useCreateEditEquipos as jest.Mock;

describe("EquipoForm", () => {

  const Wrapper = ({ isEdit, isPending }: { isEdit: boolean; isPending: boolean }) => {
    mockUseCreateEditEquipos.mockReturnValue({
      methods: useForm(),
      onSubmit: jest.fn(),
      handleSubmit: (fn: any) => fn,
      isPending,
      isEdit,
      tipoEquiposOptions : [{ id: 1, nombre: "Laptop" }],
      statusEquiposOptions : [{ id: 2, nombre: "Activo" }]
    });

    return <EquipoForm />;
  };

  it('muestra "Guardar" cuando isEdit es false', () => {
    render(<Wrapper isEdit={false} isPending={false} />);
    expect(screen.getByRole("button", { name: /guardar/i })).toBeInTheDocument();
  });

  it('muestra "Actualizar" cuando isEdit es true', () => {
    render(<Wrapper isEdit={true} isPending={false} />);
    expect(screen.getByRole("button", { name: /actualizar/i })).toBeInTheDocument();
  });

  it('muestra "Guardando..." y desactiva el botón cuando isPending es true', () => {
    render(<Wrapper isEdit={true} isPending={true} />);
    const button = screen.getByRole("button", { name: /guardando/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
