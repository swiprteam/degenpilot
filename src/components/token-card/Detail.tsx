const Icon = ({ type }: { type: "green" | "red" }) => (
  <div className="flex justify-center mb-4">
    {type === "green" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 bg-[#1f2f4b] p-2 rounded-lg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v16l7-5 7 5V3H5z"
          className="text-green-500"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 bg-[#1f2f4b] p-2 rounded-lg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 3l-7 5-7-5v16l7-5 7 5V3z"
          className="text-red-500"
        />
      </svg>
    )}
  </div>
);

const Detail = () => {
  return (
    <div className="bg-[#0f172a] rounded-lg p-4 max-w-lg mx-auto shadow-lg">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <Icon type="green" />
          <p className="text-white text-center">Lorem ipsum</p>
          <p className="text-white text-center">Lorem ipsum</p>
          <p className="text-white text-center">Lorem ipsum</p>
          <p className="text-white text-center">Lorem ipsum</p>
          <p className="text-white text-center">Lorem ipsum</p>
          <p className="text-white text-center">Lorem ipsum</p>
        </div>
        <div className="flex flex-col items-center">
          <Icon type="red" />
          <p className="text-white text-center">Lorem ipsum</p>
          <p className="text-white text-center">Lorem ipsum</p>
          <p className="text-white text-center">Lorem ipsum</p>
          <p className="text-white text-center">Lorem ipsum</p>
          <p className="text-white text-center">Lorem ipsum</p>
          <p className="text-white text-center">Lorem ipsum</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative mt-6">
        <div className="w-full h-1 bg-blue-500 rounded-full"></div>
        <div className="w-[80%] h-1 bg-green-400 absolute top-0 left-0 rounded-full"></div>
      </div>

      {/* Footer with the update date */}
      <div className="text-gray-300 text-sm mt-2 text-center">
        Updated 28/09
      </div>
    </div>
  );
};
export default Detail;
