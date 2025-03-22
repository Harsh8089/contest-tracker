import axios from "axios";
import { Contest, Contests, Status } from "../types/contest";

type CodeforcesContest = {
  id: number,
  name: string,
  startTimeSeconds: Date,
  durationSeconds: string,
  phase: "BEFORE" | "FINISHED",
}

const mapContests = (contests: CodeforcesContest[], status: Status): Contest[] => {
  return contests.map((contest) => ({
    id: contest.id.toString(),
    name: contest.name,
    status,
    date: contest.startTimeSeconds,
    durationTime: Number(contest.durationSeconds),
    url: `https://codeforces.com/${status === "upcoming" ? "contestRegistration" : "contest"}/${contest.id}` 
  }));
}

export const fetchContests: () => Promise<Contests | null> = async () => {
  try {
    const result = await axios.get('https://codeforces.com/api/contest.list');

    if(result.status === 200) {
      const allContests = result.data.result;

      const future_contests = allContests.filter((contest: CodeforcesContest) => contest.phase === "BEFORE");
      const futureContests: Contest[] = mapContests(future_contests, "upcoming");

      const past_contests = allContests.filter((contest: CodeforcesContest) => contest.phase === "FINISHED").slice(0, 10);
      const pastContests: Contest[] = mapContests(past_contests, "completed");

      // const presentContests: Contest[] = mapContests(, "on_going");

      return {
        platform: "codeforces",
        futureContests,
        pastContests,
      }
    }
    
  } catch (error) {
    console.log(error);
  }
  return null;
} 