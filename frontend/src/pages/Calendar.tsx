import FilterBar from "@/components/FilterBar"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button";
import { 
  days,
  month 
} from "@/const";
import { 
  ChevronLeft, 
  ChevronRight 
} 
from "lucide-react";
import { useState } from "react";

interface DateInterface {
  month: number,
  year: number
}

interface RenderCalendarCellProps {
  length: number,
  base?: number,
  date?: DateInterface
}

const enum CalendarButton {
  next = "next",
  prev = "prev"
}

const getStartAndEndDateofMonth = (date: Date) => {
  return {
    startDate: new Date(date.getFullYear(), date.getMonth(), 1),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
  }
}

const getMonthforDate = (date: Date) => {
  return month[date.getMonth()];
}

const getYearforDate = (date: Date) => {
  return date.getFullYear();
}

const handleArrowClick = (button: CalendarButton, setDate: React.Dispatch<React.SetStateAction<Date>>) => {
  const toAdd = (button === CalendarButton.next) ? true : false;
  
  setDate(date => {
    const prevDate = new Date(date);
    const { startDate, endDate } = getStartAndEndDateofMonth(prevDate);
    const totalDays: number = Number(endDate.toDateString().split(" ")[2]);
    if(toAdd) {
      prevDate.setDate(startDate.getDate() + totalDays);
    } else {
      prevDate.setDate(endDate.getDate() - totalDays);
    }
    return prevDate;
  })
} 

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());

  const { startDate, endDate } = getStartAndEndDateofMonth(date);
  const skipDays = startDate.getDay();
  const totalDays: number = Number(endDate.toDateString().split(" ")[2]);
  const totalRows = 1 + Math.ceil((totalDays - (7 - skipDays)) / 7);

  return (
    <div className="flex flex-col justify-center px-22 py-5">
      <Header 
        title={"Contest Calendar"}
        subTitle={"View contests in a calendar layout"}
      />

      <FilterBar />

      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold my-6">
            <span className="mr-1">
              { getMonthforDate(startDate) }
            </span>
            <span>
              { getYearforDate(startDate) }
            </span>
          </h1>
          <div className="flex gap-2 items-center">
            <Button
              variant={"outline"}
              onClick={() => { setDate(new Date()) }}
            >
              Today
            </Button>
            <Button
              variant={"outline"}
              onClick={() => handleArrowClick(CalendarButton.prev, setDate)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant={"outline"}
              onClick={() => handleArrowClick(CalendarButton.next, setDate)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              className={`py-2 text-center border-r border-b text-sm font-semibold bg-gray-50`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* For 1st row - skip and actual */}
        <div className="grid grid-cols-7">
          {<RenderCalendarCell length={skipDays} />}
          {<RenderCalendarCell length={7 - skipDays} base={1} date={{ month: date.getMonth(), year: date.getFullYear() }} />}
        </div>

        {/* For middle rows */}
        <div className={`grid grid-row-${totalRows - 2} grid-cols-7`}>
          {<RenderCalendarCell length={7 * (totalRows - 2)} base={1 + (7 - skipDays)} date={{ month: date.getMonth(), year: date.getFullYear() }} />}
        </div>

        {/* For last row */}
        <div className="grid grid-cols-7">
          {<RenderCalendarCell 
            length={totalDays - (7 - skipDays + 7 * (totalRows - 2))} 
            base={1 + (7 - skipDays) + 7 * (totalRows - 2)} 
            date={{ month: date.getMonth(), year: date.getFullYear() }}
          />}
          {<RenderCalendarCell 
            length={7 - (totalDays - (7 - skipDays + 7 * (totalRows - 2)))}
            date={{ month: date.getMonth(), year: date.getFullYear() }} 
          />}
        </div>
      </div>
    </div>
  )
}

const RenderCalendarCell = ({
  length,
  base,
  date
}: RenderCalendarCellProps) => {
  return <>
    {Array.from({ length }, (_, index) => {
      if(!base || !date) return <EmptyCell key={index} />
      
      const day = index + base;

      return <FilledCell key={index} day={day} date={date}/>
    })}
  </>
}

const EmptyCell = () => {
  return <div className="bg-gray-100 h-20 w-full border-r"></div>
}

const FilledCell = ({
  day,
  date
}: {
  day: number,
  date: DateInterface
}) => {
  const [today, month, year] = [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()];

  return <div 
  className={`${today === day && month === date.month && year === date.year ? "bg-gray-300" : "bg-gray-100"} h-20 w-full p-3 border-r border-b text-sm font-semibold`}
>
  { day }
</div>
}


export default Calendar