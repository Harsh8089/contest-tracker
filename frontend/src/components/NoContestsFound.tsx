import { Calendar, Search } from "lucide-react";

export default function NoContestsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
          <Calendar className="w-10 h-10 text-gray-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No Contests Found
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        There are no active contests for the applied filters.
      </p>
    </div>
  );
}