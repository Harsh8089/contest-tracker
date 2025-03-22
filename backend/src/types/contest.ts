export type Contest = {
  id: string,
  name: string,
  status: Status,
  date: Date,
  durationTime: number,
  url: string,
}

export type Status = "on_going" | "completed" | "upcoming";

export type Contests = {
  platform: "codechef" | "codeforces" | "leetcode",
  futureContests: Contest[],
  presentContests?: Contest[],
  pastContests: Contest[],
}