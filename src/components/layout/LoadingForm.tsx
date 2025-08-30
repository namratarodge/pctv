type LoadingProps = {
  title?: string;
  color?: string;
};

export default function Loading({
  title = "Please hold tight. Data is Loading...",
  color = "text-red-200",
}: LoadingProps) {
  return (
    <div className="flex h-100">
      <div className={`m-auto ${color}`}>{title}</div>
    </div>
  );
}
