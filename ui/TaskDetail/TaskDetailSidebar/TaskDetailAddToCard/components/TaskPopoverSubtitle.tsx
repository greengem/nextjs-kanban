export default function TaskPopoverSubtitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h4 className="uppercase font-semibold text-xs text-zinc-500 mb-1">
      {children}
    </h4>
  );
}
