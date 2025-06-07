import { 
  createContext, 
  ReactNode, 
  useEffect, 
  useRef, 
  useState 
} from "react";
import { 
  Filter, 
  Status 
} from "@/types";
import { useFetch } from "@/hooks/useFetch";

export const defaultFilterState: Filter = {
  searchContest: "",
  timeFrame: Status.ALL,
  platforms: [
    { platform: "Codechef", checked: true },
    { platform: "Codeforces", checked: true },
    { platform: "Leetcode", checked: true }
  ],
}

export const ContestContext = createContext<{
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  data: any[];
  loader: boolean
}>({
  filter: defaultFilterState,
  setFilter: () => {},
  data: [],
  loader: true
});

export const ContestProvider = ({ 
  children 
}: {
  children: ReactNode
}) => {
  const [filter, setFilter] = useState<Filter>(defaultFilterState);

  const prevFilterRef = useRef<Filter>(null);
  const timeoutRef = useRef<any>(null);

  const {
    allContestsRef,
    data,
    setData,
    loader,
    setLoader
  } = useFetch();

  useEffect(() => {
    if(!allContestsRef.current) {
      return;
    }

    if (!prevFilterRef.current) {
      setData(allContestsRef.current);
      prevFilterRef.current = filter;
      return;
    }

    setLoader(true);

    clearTimeout(timeoutRef.current);

    // added debounce logic for searchContest input field.
    timeoutRef.current = setTimeout(() => {
      const filteredContests = allContestsRef.current.filter(contest => {
        const matchesSearch = contest.name
          .toLowerCase()
          .includes(filter.searchContest.toLowerCase());

        const matchesPlatform = filter.platforms.some(p => {
          return p.platform.toLowerCase() === contest.platform.toLowerCase() && p.checked;
        });

        const matchesTimeFrame = filter.timeFrame === contest.status || filter.timeFrame === Status.ALL;
        
        return matchesSearch && matchesPlatform && matchesTimeFrame;
      });
      
      setData(filteredContests);
      prevFilterRef.current = filter;
      
      setLoader(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [filter]);

  return <ContestContext.Provider value={{ filter, setFilter, data, loader }}>
    {children}
  </ContestContext.Provider>
}