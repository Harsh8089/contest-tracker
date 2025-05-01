const BASE_URL = 'https://codeforces.com';
const CONTEST_URL = 'https://codeforces.com/api/contest.list'; 

const getContestId = (titleSplitStr: string[]): string | undefined => {
  return titleSplitStr.find(titleStr => /^[0-9]+$/.test(titleStr));
};

export { 
  BASE_URL, 
  CONTEST_URL,
  getContestId 
};