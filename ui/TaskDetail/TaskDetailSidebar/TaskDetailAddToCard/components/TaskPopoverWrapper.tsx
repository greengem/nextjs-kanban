export default function TaskPopoverWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-1 py-2 min-w-64 w-full">{children}</div>;
}
