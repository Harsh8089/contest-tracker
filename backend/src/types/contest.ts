export type Contest = {
  id: string,
  platform: Platform,
  name: string,
  status: Status,
  startTime: string,
  endTime?: string
  durationTime: number, // in mins
  url: string,
  ytVideoURL?: string,
}

export enum Status {
  ALL = 'all',
  ONGOING = 'ongoing',
  UPCOMING = 'upcoming',
  COMPLETED = 'completed'
}

export enum Platform {
  CODECHEF = "codechef",
  CODEFORCES = "codeforces",
  LEETCODE = "leetcode"
}

export type Contests = {
  platform: Platform,
  futureContests: Contest[],
  presentContests?: Contest[],
  pastContests: Contest[],
}