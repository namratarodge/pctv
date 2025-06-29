type LoadingProps = {
  title?: string;
};

export default function Loading({
  title = "Please hold tight. Data is Loading...",
}: LoadingProps) {
  return (
    <div className="flex h-100">
      <div className="m-auto text-red-700">{title}</div>
    </div>
  );
}
