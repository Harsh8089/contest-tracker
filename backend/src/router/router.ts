import express, { Request, Response } from "express";
import { fetchContests as codechefContests } from "../service/codechef.service";
import { fetchContests as codeforcesContests } from "../service/codeforces.service";

const router = express.Router();

router.get("/codechef/contests", async (req: Request, res: Response): Promise<void> => {
  try {
    const contestDetails = await codechefContests();

    if (!contestDetails) {
      res.status(404).json({
        message: "Something went wrong"
      });
      return;
    }

    res.status(200).json({
      contestDetails
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/codeforces/contests", async (req: Request, res: Response): Promise<void> => {
  try {
    const contestDetails = await codeforcesContests();

    if (!contestDetails) {
      res.status(404).json({
        message: "Something went wrong"
      });
      return;
    }

    res.status(200).json({
      contestDetails
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;