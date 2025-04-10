import { 
  Contest, 
  ContestPlatform, 
  Status
} from "@/types";

export const contests: Contest[] = [
  {
    id: 'START182',
    name: 'Starters 182',
    platform: ContestPlatform.CODECHEF,
    status: Status.UPCOMING,
    url: 'https://www.codechef.com/START182',
    startTime: "16 Apr 2025, 8:00 pm",
    endTime: "16 Apr 2025, 10:00 pm",
    durationTime: 120,
  },
  {
    id: "START183",
    name: "Starters 183",
    platform: ContestPlatform.CODECHEF,
    status: Status.UPCOMING,
    startTime: "23 Apr 2025, 8:00 pm",
    endTime: "23 Apr 2025, 10:00 pm",
    durationTime: 120,
    url: "https://www.codechef.com/START183"
  },
  {
    id: "START181",
    name: "Starters 181 (Rated for all)",
    platform: ContestPlatform.CODECHEF,
    status: Status.COMPLETED,
    startTime: "9 Apr 2025, 8:00 pm",
    endTime: "9 Apr 2025, 10:30 pm",
    durationTime: 150,
    url: "https://www.codechef.com/START181"
  },
  {
    id: "2101",
    name: "Codeforces Round (Div. 1)",
    platform: ContestPlatform.CODEFORCES,
    status: Status.UPCOMING,
    startTime: "11 May 2025, 8:05 pm",
    endTime: "11 May 2025, 10:35 pm",
    durationTime: 150,
    url: "https://codeforces.com/contestRegistration/2101"
  },
  {
    id: "2102",
    name: "Codeforces Round (Div. 2)",
    platform: ContestPlatform.CODEFORCES,
    status: Status.UPCOMING,
    startTime: "11 May 2025, 8:05 pm",
    endTime: "11 May 2025, 10:35 pm",
    durationTime: 150,
    url: "https://codeforces.com/contestRegistration/2102"
  },
  {
    id: "2093",
    name: "Codeforces Round 1016 (Div. 3)",
    platform: ContestPlatform.CODEFORCES,
    status: Status.COMPLETED,
    startTime: "8 Apr 2025, 8:05 pm",
    endTime: "8 Apr 2025, 10:20 pm",
    durationTime: 135,
    url: "https://codeforces.com/contest/2093"
  },
  {
    id: "Weekly Contest 445",
    name: "Weekly Contest 445",    
    platform: ContestPlatform.LEETCODE,
    status: Status.UPCOMING,
    startTime: "13 Apr 2025, 8:00 am",
    endTime: "13 Apr 2025, 9:30 am",
    durationTime: 90,
    url: "https://leetcode.com/contest/weekly-contest-445"
  },
  {
    id: "Biweekly Contest 154",
    name: "Biweekly Contest 154",
    platform: ContestPlatform.LEETCODE,
    status: Status.UPCOMING,
    startTime: "12 Apr 2025, 8:00 pm",
    endTime: "12 Apr 2025, 9:30 pm",
    durationTime: 90,
    url: "https://leetcode.com/contest/biweekly-contest-154"
  },
  {
    id: "Weekly Contest 444",
    name: "Weekly Contest 444",
    platform: ContestPlatform.LEETCODE,
    status: Status.COMPLETED,
    startTime: "6 Apr 2025, 8:00 am",
    endTime: "6 Apr 2025, 9:30 am",
    durationTime: 90,
    url: "https://leetcode.com/contest/weekly-contest-444"
  },
  {
    id: "Weekly Contest 443",
    name: "Weekly Contest 443",
    platform: ContestPlatform.LEETCODE,
    status: Status.COMPLETED,
    startTime: "30 Mar 2025, 8:00 am",
    endTime: "30 Mar 2025, 9:30 am",
    durationTime: 90,
    url: "https://leetcode.com/contest/weekly-contest-443"
  }
];