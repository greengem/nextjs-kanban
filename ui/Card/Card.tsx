import { ReactNode } from "react";
import { IconGripHorizontal } from "@tabler/icons-react";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`shadow-md rounded-xl text-zinc-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeaderGrab({
  dragHandleProps,
}: {
  dragHandleProps?: DraggableProvidedDragHandleProps;
}) {
  return (
    <div
      {...dragHandleProps}
      className="py-4 text-primary bg-zinc-900 cursor-grab flex justify-center items-center rounded-t-xl"
    >
      <div className="h-1 w-24 bg-zinc-700 rounded-full" />
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  showGrab = false,
  dragHandleProps,
}: {
  children: ReactNode;
  className?: string;
  showGrab?: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}) {
  return (
    <div className={`${showGrab ? "" : "rounded-t-xl"} ${className}`}>
      {showGrab && <CardHeaderGrab dragHandleProps={dragHandleProps} />}
      <div
        className={`bg-zinc-900 px-3 pt-0 ${showGrab ? "" : "rounded-t-xl"}`}
      >
        {children}
      </div>
    </div>
  );
}

export function CardBody({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`${className} p-3 first:rounded-t-xl no-scrollbar card-body last:rounded-b-xl`}
      style={style}
    >
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-zinc-900 px-3 pb-3 rounded-b-xl ${className}`}>
      {children}
    </div>
  );
}
