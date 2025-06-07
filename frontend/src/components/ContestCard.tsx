import { Contest, ContestPlatform, Status } from "@/types"
import { Bookmark, Calendar, Clock, ExternalLink, Youtube } from "lucide-react";

interface ContestCardProps {
  contest: Contest;
}

const getPlatformName = (platform: string) => 
  platform.charAt(0).toUpperCase() + platform.slice(1);

const getTimeStatus = (startTime: string, endTime: string): {
  tag: Status
  status: string,
} => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const today = new Date();

  if (start > today) {
    const diffInMins = Math.floor((start.getTime() - today.getTime()) / (1000 * 60));
    if(diffInMins > 60) {
      const diffInHrs = Math.floor(diffInMins / 60);
      if(diffInHrs >= 12) {
        return {
          tag: Status.UPCOMING,
          status: `Starts in ${Math.floor(diffInHrs / 24)} days`
        };
      } 
      return {
        tag: Status.UPCOMING,
        status: `Starts in ${diffInHrs} hr`
      };
    }
    return {
      tag: Status.UPCOMING,
      status: `Starts in ${diffInMins} hr`
    };
  } else if (end < today) {
    return {
      tag: Status.COMPLETED,
      status: 'Ended'
    }
  } else {
    const diffInMins = Math.floor((end.getTime() - today.getTime()) / (1000 * 60));
    return {
      tag: Status.ONGOING,
      status: `Ends in ${diffInMins} mins`,
    }
  }
}

const ContestCard: React.FC<ContestCardProps> = ({
  contest
}) => {
  const { tag, status } = getTimeStatus(contest.startTime, contest.endTime);

  return (
    <div 
      onClick={() => window.open(contest.url, "_blank")}
      className="flex flex-col justify-center p-4 gap-3 border rounded-md cursor-pointer hover:bg-gray-50"
    > 
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`${
            contest.platform.toUpperCase() === ContestPlatform.CODECHEF ? 'text-blue-700 bg-blue-50' : 
            contest.platform.toUpperCase() === ContestPlatform.CODEFORCES ? 'text-rose-950 bg-rose-50' : 'text-orange-800 bg-orange-50'
          } text-[13px] px-2 py-1 rounded-md font-semibold`}>
            { getPlatformName(contest.platform) }
          </div>
          <div className={`${
            tag === Status.UPCOMING ? 'text-blue-800 bg-blue-50' : 
            tag === Status.COMPLETED ? 'text-gray-800 bg-gray-50' : ''
          } text-[14px] px-2 py-1 rounded-md flex items-center gap-1 font-semibold`}>
            <Clock className="w-3 h-3" />
            { status }
          </div>
        </div>
        {/* <button
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="group hover:bg-gray-200 p-2 rounded-full cursor-pointer transition-all duration-300"
        >
          <Bookmark className="h-4 w-4 group-hover:opacity-100 transition-transform"/>
        </button> */}
      </header>
      <main>
        <h1 className="text-xl font-semibold mb-3">
          { contest.name }
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500 " />
            <div className="text-sm text-gray-700">
              { contest.startTime.replace(",", ", at") }
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div className="text-sm text-gray-700">
              Duration: { contest.durationTime / 60 } hr
            </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 text-blue-500">
          <ExternalLink className="h-4 w-4"/>
          <p className="text-sm">
            Visit Contest
          </p>
        </div>
        {contest.ytVideoURL && <button 
          onClick={(e) => {
            e.stopPropagation();
            window.open(contest.ytVideoURL, "_blank")
          }}
          className="flex items-center gap-2 text-red-500 cursor-pointer hover:bg-gray-100 transition-all duration-300 p-2 rounded-md">
          <Youtube className="h-4 w-4"/>
          <p className="text-sm">
            PCD
          </p>
        </button>}
      </footer>
    </div>
  )
}

export default ContestCard