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
import { useContest } from "@/hooks/useContest"
import { ContestPlatform } from "@/types"
import { Bookmark, Filter, Search } from "lucide-react"
import { useEffect, useState } from "react"

const FilterBar = () => {
  const { setFilter } = useContest();

  const [filters, setFilters] = useState([
    { platform: "Codechef", checked: true },
    { platform: "Codeforces", checked: true },
    { platform: "Leetcode", checked: true }
  ]);

  const handleToggle = (platform: any) => {
    const isPlatformChecked = filters.filter(state => state.platform === platform)[0].checked;
    const isNotChecked = filters.filter(state => state.checked === false).length;
    if (filters.length - 1 <= isNotChecked && isPlatformChecked) {
      return;
    }

    setFilters((state) => {
      return state.map((filter) => {
        if (filter.platform === platform) {
          return { ...filter, checked: !filter.checked };
        }
        return filter;
      });
    });
  }

  useEffect(() => {
    setFilter(prev => ({
      ...prev,
      platform: filters
      .filter(p => p.checked)
      .map(p => p.platform.toLowerCase() as ContestPlatform)
    }))
  }, [filters]);

  return <div className="w-full flex items-center justify-between space-x-4 p-4 glass-panel my-5">
    <div className="relative flex-10">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        className="pl-9 pr-8 focus:border-black focus:border-2"
        placeholder="Search contests..."
      />
    </div>

    <div className="flex-10">
      <Select>
        <SelectTrigger className="focus-visible:ring-0 focus-visible:ring-offset-0 w-full">
          <SelectValue placeholder="Select time frame" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-white">
            <SelectItem value="all">
              All Contests
            </SelectItem>
            <SelectItem value="upcoming">
              Upcoming Contests
            </SelectItem>
            <SelectItem value="ongoing">
              Ongoing Contests
            </SelectItem>
            <SelectItem value="past">
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
              {filters.map((filter, index) => (
                filter.checked && (
                  <div
                    key={index}
                    className={`${filter.platform === "Codechef" ? "bg-blue-600" : (filter.platform === "Codeforces" ? "bg-rose-950" : "bg-orange-600")} w-2 h-2 rounded-full`}
                  />
                )
              ))}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white min-w-56"
        >
          <DropdownMenuLabel className="border-b">
            Select Platforms
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filters.map((filter, index) => (
            <DropdownMenuCheckboxItem
              key={index}
              checked={filter.checked}
              onClick={() => handleToggle(filter.platform)}
              className="cursor-pointer"
            >
              <div
                key={index}
                className={`${filter.platform === "Codechef" ? "bg-blue-600" : (filter.platform === "Codeforces" ? "bg-rose-950" : "bg-orange-600")} w-2 h-2 rounded-full`}
              />
              {filter.platform}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div className="flex-1">
      <Button
        variant={"outline"}
        onClick={() => { }}
      >
        <Bookmark />
      </Button>
    </div>
  </div>
};

export default FilterBar;