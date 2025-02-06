import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeFilterProps {
  label: string;
  active?: boolean;
}

export function DashboardHeader() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-white text-4xl font-semibold">Dashboard</h1>
      <div className="flex gap-4">
        <Button variant="ghost" className="bg-dark-card text-white">
          Manage
        </Button>
      </div>
    </header>
  );
}

export function TimeFilter({ label, active }: TimeFilterProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-full",
        active ? "bg-primary text-white" : "bg-dark-card text-gray-400"
      )}
    >
      {label}
    </button>
  );
} 