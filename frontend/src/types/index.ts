export enum ContestPlatform {
  CODEFORCES = 'codeforces',
  CODECHEF = 'codechef',
  LEETCODE = 'leetcode',
}

export type Status = "on_going" | "completed" | "upcoming";

export type Contest = {
  id: string,
  name: string,
  platform: ContestPlatform,
  status: Status,
  startTime: string,
  endTime: string,
  duration: number,
  url: string
}