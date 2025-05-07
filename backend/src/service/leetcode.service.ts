import axios from "axios";
import { 
  Contest, 
  Contests, 
  Platform, 
  Status 
} from "../types/contest";
import { 
  BASE_URL, 
  CONTEST_URL 
} from "../utils/leetcode.utils";
import { epochToIST } from "../utils/date.utils";
import { getYoutubeURL } from "./youtube.service";

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
      platform: Platform.LEETCODE,
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
      const futureContests: Contest[] = mapContests(future_contests, Status.UPCOMING);

      const ytURL = await getYoutubeURL(Platform.LEETCODE);
      const past_contests = allContests.filter((contest: LeetcodeContest) => contest.startTime * 1000 < new Date().getTime()).splice(0, 10);
      const pastContests: Contest[] = mapContests(past_contests, Status.COMPLETED).map(contest => {
        const getUrl = ytURL.find(url => {
          return url.title.split(" ").includes(contest.id.split(" ").at(-1));
        });

        return {
          ...contest,
          ytVideoURL: getUrl?.url ?? undefined
        };
      });

      return {
        platform: Platform.LEETCODE,
        futureContests,
        pastContests,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return null;
} 
