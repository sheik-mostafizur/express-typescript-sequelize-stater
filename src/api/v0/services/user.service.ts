import User from '@/database/models/user';

export const getUserService = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};
