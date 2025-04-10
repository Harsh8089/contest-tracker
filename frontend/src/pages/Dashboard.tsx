import ContestCard from "@/components/ContestCard";
import FilterBar from "@/components/FilterBar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { contests } from "@/mock-data/contests";
import { Status } from "@/types";

const Dashboard = () => {
  return <div className="flex flex-col justify-center px-22 py-5">
    <div className="flex flex-col items-start w-full">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Contest Dashboard
      </h1>
      <h3 className="text-muted-foreground">
        Track upcoming and completed programming contests from multiple platforms
      </h3>
    </div>

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

      <TabsContent value={Status.ALL}>
        <div className="grid grid-cols-3 gap-2.5">
          {contests.map(contest => (
              <ContestCard
                key={contest.id}
                contest={contest}
              />
          ))}
        </div>
      </TabsContent>
      <TabsContent value={Status.UPCOMING}>
        <div className="grid grid-cols-3 gap-2.5">
        {
          contests.
          filter(contest => contest.status === Status.UPCOMING)
          .map(contest => (
            <ContestCard
              key={contest.id}
              contest={contest}
            />
          ))
        }
        </div>
      </TabsContent>
      <TabsContent value={Status.ONGOING}>
      <div className="grid grid-cols-3 gap-2.5">
        {
          contests.
          filter(contest => contest.status === Status.ONGOING)
          .map(contest => (
            <ContestCard
              key={contest.id}
              contest={contest}
            />
          ))
        }
        </div>
      </TabsContent>
      <TabsContent value={Status.COMPLETED}>
      <div className="grid grid-cols-3 gap-2.5">
        {
          contests.
          filter(contest => contest.status === Status.COMPLETED)
          .map(contest => (
            <ContestCard
              key={contest.id}
              contest={contest}
            />
          ))
        }
        </div>
      </TabsContent>
    </Tabs>
  </div>
}

export default Dashboard;