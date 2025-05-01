type LoadingProps = {
    title?: string;
  };
  
  export default function Loading({ title = "Please hold tight. Data is Loading..." }: LoadingProps) {
    return (
      <div>
        <div className="flex justify-center items-center h-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-solid"></div>
        </div>
        <h3 className="items-center text-center text-lg text-gray-600">
          {title}
        </h3>
      </div>
    );
  }