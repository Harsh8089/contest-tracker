import { Contest } from "@/types";
import { CalendarSearch } from "lucide-react";
import React from "react";
import ContestCard from "./ContestCard";
import { month } from "@/const";
import NoContestsFound from "./NoContestsFound";

type Props = {
  selectedDateInfo: { date: Date, contests: Contest[] } | null
}

const ContestCalendarView: React.FC<Props> = ({
  selectedDateInfo
}) => {
  if(!selectedDateInfo) return null;

  const title = `Contests on ${month[selectedDateInfo.date.getMonth()]} ${selectedDateInfo.date.getDate()}, ${selectedDateInfo.date.getFullYear()}`

  return <>
    {selectedDateInfo && <div className="flex flex-col justify-center mt-8">
      <div className="flex items-center gap-3 mb-4">
        <CalendarSearch className="w-5 h-5" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {selectedDateInfo.contests.map(contest => {
          return <ContestCard 
            key={contest.id} 
            contest={contest} 
          />
        })}
        <div className="w-full flex items-center justify-center">
          {!selectedDateInfo.contests.length && <NoContestsFound />}
        </div>
      </div>
    </div>
    }
  </>
}

export default ContestCalendarView;