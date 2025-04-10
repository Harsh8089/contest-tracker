export type Contest = {
  id: string,
  name: string,
  status: Status,
  startTime: string,
  endTime?: string
  durationTime: number, // in mins
  url: string,
}

export type Status = "ongoing" | "completed" | "upcoming";

export type Contests = {
  platform: "codechef" | "codeforces" | "leetcode",
  futureContests: Contest[],
  presentContests?: Contest[],
  pastContests: Contest[],
}