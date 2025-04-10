import axios from "axios";
import { 
  Contest, 
  Contests, 
  Status 
} from "../types/contest";
import { 
  BASE_URL, 
  CONTEST_URL 
} from "../utils/leetcode.utils";
import { epochToIST } from "../utils/date.utils";

export type LeetcodeContest = {
  title: string,
  startTime: number,
  duration: number,
  titleSlug: string,
};

const contestQuery = `query { 
  allContests { 
    title 
    startTime 
    duration  
    titleSlug 
    isVirtual
  } 
}`

const mapContests = (contests: LeetcodeContest[], status: Status): Contest[] => {
  return contests.map((contest) => {
    const startTime = epochToIST(contest.startTime);
    const endTime = epochToIST(contest.startTime + contest.duration);
    const url = contest.title.toLowerCase().replace(/ /g, "-");

    return {
      id: contest.title,
      name: contest.title,
      status,
      startTime: startTime,
      endTime: endTime,
      durationTime: contest.duration / 60,
      url: `${BASE_URL}/contest/${url}` 
    }
  });
}

export const fetchContests =  async (): Promise<Contests | null> => {
  try {
    const result = await axios.post(`${CONTEST_URL}`, {
      query: contestQuery
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(result.status === 200) {
      const allContests = result.data.data.allContests;
      
      const future_contests = allContests.filter((contest: LeetcodeContest) => contest.startTime * 1000 > new Date().getTime());
      const futureContests: Contest[] = mapContests(future_contests, "upcoming");

      const past_contests = allContests.filter((contest: LeetcodeContest) => contest.startTime * 1000 < new Date().getTime());
      const pastContests: Contest[] = mapContests(past_contests, "completed");

      return {
        platform: "leetcode",
        futureContests,
        pastContests,
      }
    }
  } catch (error) {
    console.log(error);
  }
  return null;
} 
