import express, { Request, Response } from "express";
import { 
  fetchContests as codechefContests 
} from "../service/codechef.service";
import { 
  fetchContests as codeforcesContests 
} from "../service/codeforces.service";
import { 
  fetchContests as leetcodeContests 
} from "../service/leetcode.service";

const router = express.Router();

const sendSuccessResponse = (res: Response, data: any, statusCode: number = 200): void => {
  res.status(statusCode).json(data);
};

const sendErrorResponse = (res: Response, message: string, statusCode: number = 500): void => {
  res.status(statusCode).json({ message });
};


router.get("/all/contests", async (req: Request, res: Response): Promise<void> => {
  try {
    const contestDetails = await Promise.allSettled([codechefContests(), codeforcesContests(), leetcodeContests()]);

    const fulfilledDetails = contestDetails.filter(contest => contest.status === 'fulfilled');

    if(!fulfilledDetails.length) {
      sendErrorResponse(res, "Something went wrong", 404);
      return;
    }

    sendSuccessResponse(res, fulfilledDetails, 200);
  } catch (error) {
    sendErrorResponse(res, "Internal Server Error");
  }
});

router.get("/codechef/contests", async (req: Request, res: Response): Promise<void> => {
  try {
    const contestDetails = await codechefContests();

    if(!contestDetails) {
      sendErrorResponse(res, "Something went wrong", 404);
      return;
    }

    sendSuccessResponse(res, contestDetails, 200);
  } catch (error) {
    sendErrorResponse(res, "Internal Server Error");
  }
});

router.get("/codeforces/contests", async (req: Request, res: Response): Promise<void> => {
  try {
    const contestDetails = await codeforcesContests();

    if(!contestDetails) {
      sendErrorResponse(res, "Something went wrong", 404);
      return;
    }

    sendSuccessResponse(res, contestDetails, 200);
  } catch (error) {
    sendErrorResponse(res, "Internal Server Error");
  }
});

router.get("/leetcode/contests", async (req: Request, res: Response): Promise<void> => {
  try {
    const contestDetails = await leetcodeContests();

    if(!contestDetails) {
      sendErrorResponse(res, "Something went wrong", 404);
      return;
    }

    sendSuccessResponse(res, contestDetails, 200);
  } catch (error) {
    sendErrorResponse(res, "Internal Server Error");
  }
});

export default router;