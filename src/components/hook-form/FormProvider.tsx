import { ReactNode } from "react";
import { UseFormReturn, FormProvider as RHFProvider } from "react-hook-form";

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <RHFProvider {...methods}>
      <form onSubmit={onSubmit} className="w-full">
        {children}
      </form>
    </RHFProvider>
  );
}
