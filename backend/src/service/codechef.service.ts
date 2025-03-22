import axios from "axios";
import { Contest, Contests, Status } from "../types/contest";

type CodechefContest = {
  contest_code: string,
  contest_name: string,
  contest_start_date: Date,
  contest_duration: string,
}

const mapContests = (contests: CodechefContest[], status: Status): Contest[] => {
  return contests.map((contest) => ({
    id: contest.contest_code,
    name: contest.contest_name,
    status,
    date: contest.contest_start_date,
    durationTime: Number(contest.contest_duration),
    url: `https://www.codechef.com/${contest.contest_code}`,
  }));
}

export const fetchContests: () => Promise<Contests | null> = async () => {
  try {
    const result = await axios.get('https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all');

    if(result.status === 200) {
      const futureContests: Contest[] = mapContests(result.data.future_contests, "upcoming");

      const pastContests: Contest[] = mapContests(result.data.past_contests, "completed");

      const presentContests: Contest[] = mapContests(result.data.present_contests, "on_going");

      return {
        platform: "codechef",
        futureContests,
        pastContests,
        presentContests
      }
    }
    
  } catch (error) {
    console.log(error);
  }
  return null;
} 