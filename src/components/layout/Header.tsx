import { Logo } from "@/components/brand/Logo";

export function Header() {
  return (
    <header className="bg-primary">
      <div className="mx-auto flex max-w-7xl items-center justify-center py-4">
        <Logo className="h-7 w-auto text-white" />
      </div>
    </header>
  );
}