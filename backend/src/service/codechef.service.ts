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
} from "../utils/codechef.utils";
import { 
  addSecondsToIST, 
  formatDateToIST 
} from "../utils/date.utils";
import { getYoutubeURL } from "./youtube.service";

type CodechefContest = {
  contest_code: string,
  contest_name: string,
  contest_start_date: Date,
  contest_duration: string,
}

const mapContests = (contests: CodechefContest[], status: Status): Contest[] => {
  return contests.map((contest) => {
    const startDate = new Date(contest.contest_start_date);
    const endDate = addSecondsToIST(startDate, parseInt(contest.contest_duration) * 60);
    
    return {
      id: contest.contest_code,
      name: contest.contest_name,
      status,
      startTime: formatDateToIST(startDate),
      endTime: formatDateToIST(endDate),
      durationTime: parseInt(contest.contest_duration),
      url: `${BASE_URL}/${contest.contest_code}`,      
    };
  });
};

export const fetchContests: () => Promise<Contests | null> = async () => {
  try {
    const result = await axios.get(`${CONTEST_URL}`);

    if(result.status === 200) {
      const futureContests: Contest[] = mapContests(result.data.future_contests, Status.UPCOMING);

      const ytURL = await getYoutubeURL(Platform.CODECHEF);
      const pastContests: Contest[] = mapContests(result.data.past_contests, Status.COMPLETED).map(contest => {
        const getUrl = ytURL.find(url => {
          return url.title.split(" ").includes(contest.id.replace("START", ""));
        });

        return {
          ...contest,
          ytVideoURL: getUrl?.url ?? undefined
        };
      });

      const presentContests: Contest[] = mapContests(result.data.present_contests, Status.ONGOING);

      return {
        platform: Platform.CODECHEF,
        futureContests,
        pastContests,
        presentContests
      };
    }
    
  } catch (error) {
    console.log(error);
  }
  return null;
} 