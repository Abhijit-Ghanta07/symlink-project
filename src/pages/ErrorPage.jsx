function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
      <p className="text-xl mt-4">Something went wrong.</p>
      <p className="text-gray-600 mt-2">
        Please try again later or contact support.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  );
}

export default ErrorPage;
