import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { defaultFilterState } from "@/context/ContestContext"
import { useContest } from "@/hooks/useContest"
import { Status } from "@/types"
import { Filter, RotateCcw, Search } from "lucide-react"

const FilterBar = () => {
  const { filter, setFilter } = useContest();

  const { 
    searchContest,
    timeFrame,
    platforms   
  } = filter;

  const handleToggle = (platform: any) => {
    const isPlatformChecked = platforms.filter(state => state.platform === platform)[0].checked;
    const isNotChecked = platforms.filter(state => state.checked === false).length;
    if (platforms.length - 1 <= isNotChecked && isPlatformChecked) {
      return;
    } 

    setFilter(filter => {
      const platforms = filter.platforms;

      const updatedPlatForms =  platforms.map(p => {
        if(p.platform === platform) {
          return {
            ...p,
            checked: !p.checked
          }
        } else {
          return p;
        }
      });

      return {
        ...filter,
        platforms: updatedPlatForms
      }
    });
  }
  
  return <div className="w-full flex items-center justify-between space-x-4 p-4 glass-panel my-5">
    <div className="relative flex-10">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        className="pl-9 pr-8 focus:border-black dark:focus:border-white focus:border-2"
        placeholder="Search contests..."
        value={searchContest}
        onChange={(e) => {
          setFilter(prev => ({
            ...prev,
            searchContest: e.target.value
          }));
        }}
      />
    </div>

    <div className="flex-10">
      <Select
        defaultValue={timeFrame}
        onValueChange={(value: Status) => {
          setFilter(prev => ({
            ...prev,
            timeFrame: value
          }));
        }}
      >
        <SelectTrigger defaultValue={Status.ALL} className="focus-visible:ring-0 focus-visible:ring-offset-0 w-full">
          <SelectValue placeholder="Select time frame" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-white dark:bg-gray-900">
            <SelectItem value={Status.ALL}>
              All Contests
            </SelectItem>
            <SelectItem value={Status.UPCOMING}>
              Upcoming Contests
            </SelectItem>
            <SelectItem value={Status.ONGOING}>
              Ongoing Contests
            </SelectItem>
            <SelectItem value={Status.COMPLETED}>
              Past Contests
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div className="flex-10">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <Button
            variant={"outline"}
            className="h-10 w-full px-4"
          >
            <Filter />
            <span>
              Platforms
            </span>
            <div className="flex gap-2 items-center">
              {filter.platforms.map((filter, index) => {
                const platform = filter.platform.toLowerCase();

                return filter.checked && (
                  <div
                    key={index}
                    className={style(platform)}
                  />
                )
              })}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white dark:bg-gray-900 min-w-56"
        >
          <DropdownMenuLabel className="border-b border-gray-200 dark:border-gray-700">
            Select Platforms
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filter.platforms.map((p, index) => {
            const platform = p.platform.toLowerCase();

            return <DropdownMenuCheckboxItem
              key={index}
              checked={p.checked}
              onClick={() => handleToggle(p.platform)}
              className="cursor-pointer"
            >
              <div
                key={index}
                className={style(platform)}
              />
              {p.platform}
            </DropdownMenuCheckboxItem>
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div className="flex-1">
      <Button
        variant={"outline"}
        onClick={() => {
          setFilter(defaultFilterState)
        }}
      >
        <RotateCcw />
      </Button>
    </div>
  </div>
};

const style = (platform: string) => `${platform === "codechef" ? 
                                      "bg-blue-600" : (platform === "codeforces" ?
                                        "bg-rose-950 dark:bg-rose-800" : "bg-orange-600")} w-2 h-2 rounded-full`
export default FilterBar;