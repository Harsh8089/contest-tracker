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

  let allContestsRef = useRef<Contest[]>([]);

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
    const filteredContests = allContestsRef
                            .current
                            .filter(contest => filter.platform.includes(contest.platform));

    setData(filteredContests);
  }, [filter]);

  return <ContestContext.Provider value={{ filter, setFilter, data, loader }}>
    {children}
  </ContestContext.Provider>
}