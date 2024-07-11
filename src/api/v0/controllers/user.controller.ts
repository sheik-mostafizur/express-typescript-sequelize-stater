import { Request, Response } from 'express';
import { getUserService } from '@/api/v0/services/user.service';

export const getUser = async (req: Request, res: Response) => {
  const user = await getUserService();
  res.json(user);
};
