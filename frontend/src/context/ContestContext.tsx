import { 
  createContext, 
  ReactNode, 
  useEffect, 
  useRef, 
  useState 
} from "react";
import axios from "axios";
import { 
  Contest,
  ContestPlatform, 
  Filter, 
  Status 
} from "@/types";

const defaultFilterState: Filter = {
  searchContest: "",
  timeFrame: Status.ALL,
  platform: [
    ContestPlatform.CODECHEF, 
    ContestPlatform.CODEFORCES, 
    ContestPlatform.LEETCODE
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
  const [data, setData] = useState<Contest[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  const prevFilterRef = useRef<Filter>(null);
  const allContestsRef = useRef<Contest[]>([]);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/all/contests')
    .then(res => {
      allContestsRef.current = res.data;
      setData(res.data);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setLoader(true);
    })
  }, []);

  useEffect(() => {
    if (!prevFilterRef.current) {
      setData(allContestsRef.current);
      prevFilterRef.current = filter;
      return;
    }

    clearTimeout(timeoutRef.current);

    // added debounce logic for searchContest input field.
    timeoutRef.current = setTimeout(() => {
      const filteredContests = allContestsRef.current.filter(contest => {
        const matchesSearch = contest.name
          .toLowerCase()
          .includes(filter.searchContest.toLowerCase());

        const matchesPlatform = filter.platform.includes(contest.platform);

        const matchesTimeFrame = filter.timeFrame === contest.status;

        return matchesSearch && matchesPlatform && matchesTimeFrame;
      });

      setData(filteredContests);
      prevFilterRef.current = filter;
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [filter]);

  return <ContestContext.Provider value={{ filter, setFilter, data, loader }}>
    {children}
  </ContestContext.Provider>
}