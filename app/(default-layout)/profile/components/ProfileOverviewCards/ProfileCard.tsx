import { ReactNode } from "react";
import { Suspense } from "react";
import { IconLoader2 } from "@tabler/icons-react";

interface ProfileCardProps {
  icon: ReactNode;
  countComponent: ReactNode;
  label: string;
}

export default function ProfileCard({
  icon,
  countComponent,
  label,
}: ProfileCardProps) {
  return (
    <div className="text-center space-y-2 bg-zinc-700 p-5 shadow-md rounded-xl">
      <div className="flex justify-center">{icon}</div>
      <div className="font-semibold text-xl flex flex-col items-center">
        <Suspense fallback={<IconLoader2 size={28} className="animate-spin" />}>
          {countComponent}
        </Suspense>
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );
}
