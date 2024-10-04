import { TokenInterface } from "~/types/interfaces";
import dayjs from "dayjs";
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

const Detail = ({ token }: { token: TokenInterface }) => {
  return (
    <div className="rounded-lg p-2 max-w-lg mx-auto shadow-lg">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-start">
          <Icon type="green" />
          <div className="text-left text-xs">
            {token.score.details.pros.map((pro) => (
              <p className="text-white text-left my-1">- {pro}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <Icon type="red" />
          <div className="text-left text-xs">
            {token.score.details.cons.map((con) => (
              <p className="text-white text-left my-1">- {con}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar 
      <div className="relative mt-6">
        <div className="w-full h-1 bg-blue-500 rounded-full"></div>
        <div className="w-[80%] h-1 bg-green-400 absolute top-0 left-0 rounded-full"></div>
      </div>
      */}

      {/* Footer with the update date */}
      <div className="text-gray-300 text-sm mt-2 text-center">
        Updated at: {dayjs(token.meta.updatedAt).format("YYYY/MM/DD HH:mm:ss")}
      </div>
    </div>
  );
};
export default Detail;
