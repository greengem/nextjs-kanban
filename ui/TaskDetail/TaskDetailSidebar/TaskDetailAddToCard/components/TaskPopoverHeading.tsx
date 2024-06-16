export default function TaskPopoverHeading({
  title,
  beforeContent,
  afterContent,
}: {
  title: string;
  beforeContent?: React.ReactNode;
  afterContent?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between mb-3 items-center">
      {beforeContent ? beforeContent : <div />}
      <h4 className="text-center font-semibold text-lg">{title}</h4>
      {afterContent ? afterContent : <div />}
    </div>
  );
}
