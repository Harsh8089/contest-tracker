export enum ContestPlatform {
  CODEFORCES = 'CODEFORCES',
  CODECHEF = 'CODECHEF',
  LEETCODE = 'LEETCODE',
}

export const Platform = {
  [ContestPlatform.CODECHEF]: 'codechef',
  [ContestPlatform.CODEFORCES]: 'codeforces',
  [ContestPlatform.LEETCODE]: 'leetcode',
}

type PlatformName = typeof Platform[keyof typeof Platform];

export enum Status {
  ALL = 'all',
  ONGOING = 'ongoing',
  UPCOMING = 'upcoming',
  COMPLETED = 'completed'
}

export type Contest = {
  id: string,
  name: string,
  platform: PlatformName,
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
  platforms: {
    platform: PlatformName;
    checked: boolean;
  }[];
}