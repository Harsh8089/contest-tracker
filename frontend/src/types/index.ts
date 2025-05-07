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
  platform: 'codechef' | 'codeforces' | 'leetcode',
  status: 'ongoing' | 'upcoming' | 'completed',
  startTime: string,
  endTime: string,
  durationTime: number,
  url: string,
  ytVideoURL?: string
}