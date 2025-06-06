import ContestCard from "@/components/ContestCard";
import FilterBar from "@/components/FilterBar";
import Header from "@/components/Header";
import NoContestsFound from "@/components/NoContestsFound";
import { Loader } from "@/components/ui/loader";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { useContest } from "@/hooks/useContest";
// import { contests } from "@/mock-data/contests";
import { Status } from "@/types";

const tabStatuses = Object.values(Status);

const Dashboard = () => {
  const { data: contests, loader } = useContest();

  return <div className="flex flex-col justify-center px-22 py-5">
    <Header 
      title={"Contest Dashboard"}
      subTitle={"Track upcoming and completed programming contests from multiple platforms"}
    />

    <FilterBar />

    <Tabs
      defaultValue={Status.ALL}
      className="my-2"
    >
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value={Status.ALL}>
          All
          <span className="ml-2 text-xs bg-secondary rounded-full px-2 py-0.5">
            { contests.length }
          </span>
        </TabsTrigger>
        <TabsTrigger value={Status.UPCOMING}>
          Upcoming
          <span className="ml-2 text-xs bg-secondary rounded-full px-2 py-0.5">
            { contests.filter(contest => contest.status === Status.UPCOMING).length }
          </span>
        </TabsTrigger>
        <TabsTrigger value={Status.ONGOING}>
          Ongoing
          <span className="ml-2 text-xs bg-secondary rounded-full px-2 py-0.5">
            { contests.filter(contest => contest.status === Status.ONGOING).length }
          </span>
        </TabsTrigger>
        <TabsTrigger value={Status.COMPLETED}>
          Past
          <span className="ml-2 text-xs bg-secondary rounded-full px-2 py-0.5">
            { contests.filter(contest => contest.status === Status.COMPLETED).length }
          </span>
        </TabsTrigger>
      </TabsList>

      {loader ? <Loader /> :
        contests.length === 0 ? <NoContestsFound /> :
          <>
            {tabStatuses.map(status => (
              <TabsContent key={status} value={status}>
                <div className="grid grid-cols-3 gap-2.5">
                  {(status === Status.ALL 
                    ? contests 
                    : contests.filter(contest => contest.status === status)
                  ).map(contest => (
                    <ContestCard 
                      key={contest.id} 
                      contest={contest} 
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </>
      }
    </Tabs>
  </div>
}

export default Dashboard;