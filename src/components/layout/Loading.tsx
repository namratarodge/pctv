type LoadingProps = {
  title?: string;
};

export default function Loading({
  title = "Please hold tight. Data is Loading...",
}: LoadingProps) {
  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
        {title}
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-solid"></div>
      </div>
    </div>
  );
}
