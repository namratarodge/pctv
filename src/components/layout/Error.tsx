type ErrorProps = {
  message?: string;
};

export default function Error({ message }: ErrorProps) {
  if (!message) return null;
  return <div className="text-red-500 text-sm mt-2">{message}</div>;
}
