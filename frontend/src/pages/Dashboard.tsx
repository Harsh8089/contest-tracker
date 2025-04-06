import FilterBar from "@/components/FilterBar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

const Dashboard = () => {
  return <div className="flex flex-col justify-center px-22 py-5">
    <div className="flex flex-col items-start w-full">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Contest Dashboard
      </h1>
      <h3 className="text-muted-foreground">
        Track upcoming and past programming contests from multiple platforms
      </h3>
    </div>

    <FilterBar />

    <Tabs
      defaultValue="all"
      className="my-2"
    >
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="all">
          All
          <span className="ml-2 text-xs bg-secondary rounded-full px-2 py-0.5">
            {/* {filteredContests.length} */} 1
          </span>
        </TabsTrigger>
        <TabsTrigger value="upcoming">
          Upcoming
          <span className="ml-2 text-xs bg-secondary rounded-full px-2 py-0.5">
            10
          </span>
        </TabsTrigger>
        <TabsTrigger value="ongoing">
          Ongoing
          <span className="ml-2 text-xs bg-secondary rounded-full px-2 py-0.5">
            5
          </span>
        </TabsTrigger>
        <TabsTrigger value="past">
          Past
          <span className="ml-2 text-xs bg-secondary rounded-full px-2 py-0.5">
            3
          </span>
        </TabsTrigger>
      </TabsList>


      <TabsContent value="all">
        All contest list
      </TabsContent>
      <TabsContent value="upcoming">
        Upcoming contest list
      </TabsContent>
      <TabsContent value="ongoing">
        Ongoing contest list
      </TabsContent>
      <TabsContent value="past">
        Past contest list
      </TabsContent>
    </Tabs>
  </div>
}

export default Dashboard;