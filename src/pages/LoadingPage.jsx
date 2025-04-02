import { FiLoader } from "react-icons/fi";

function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FiLoader className="animate-spin text-blue-500 text-6xl" />
    </div>
  );
}

export default LoadingPage;
