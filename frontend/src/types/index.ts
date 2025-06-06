export enum ContestPlatform {
  CODEFORCES = 'codeforces',
  CODECHEF = 'codechef',
  LEETCODE = 'leetcode',
}

export enum Status {
  ALL = 'all',
  ONGOING = 'ongoing',
  UPCOMING = 'upcoming',
  COMPLETED = 'completed'
}

export type Contest = {
  id: string,
  name: string,
  platform: ContestPlatform,
  status: Exclude<Status, Status.ALL>,
  startTime: string,
  endTime: string,
  durationTime: number,
  url: string,
  ytVideoURL?: string
}

export type Filter = {
  searchContest: string;
  timeFrame: Status;
  platform: ContestPlatform[];
}