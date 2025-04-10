import axios from "axios";
import { 
  Contest, 
  Contests, 
  Status 
} from "../types/contest";
import { 
  BASE_URL, 
  CONTEST_URL 
} from "../utils/codeforces.utils";
import { epochToIST } from "../utils/date.utils";

export type CodeforcesContest = {
  id: number,
  name: string,
  startTimeSeconds: number,
  durationSeconds: string,
  phase: "BEFORE" | "CODING" | "FINISHED",
}

const mapContests = (contests: CodeforcesContest[], status: Status): Contest[] => {
  return contests.map((contest) => {
    const startTime = epochToIST(contest.startTimeSeconds);
    const endTime = epochToIST(contest.startTimeSeconds + parseInt(contest.durationSeconds));

    return {    
      id: contest.id.toString(),
      name: contest.name,
      status,
      startTime: startTime,
      endTime: endTime,
      durationTime: parseInt(contest.durationSeconds) / 60,
      url: `${BASE_URL}/${status === "upcoming" ? "contestRegistration" : "contest"}/${contest.id}` 
    }
  });
}

export const fetchContests: () => Promise<Contests | null> = async () => {
  try {
    const result = await axios.get(`${CONTEST_URL}`);

    if(result.status === 200) {
      const allContests = result.data.result;

      const future_contests = allContests.filter((contest: CodeforcesContest) => contest.phase === "BEFORE");
      const futureContests: Contest[] = mapContests(future_contests, "upcoming");

      const past_contests = allContests.filter((contest: CodeforcesContest) => contest.phase === "FINISHED");
      const pastContests: Contest[] = mapContests(past_contests, "completed");

      const present_contests = allContests.filter((contest: CodeforcesContest) => contest.phase === "CODING");
      const presentContests: Contest[] = mapContests(present_contests, "ongoing");

      return {
        platform: "codeforces",
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