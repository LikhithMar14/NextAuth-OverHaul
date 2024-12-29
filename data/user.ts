import db from '@/db'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    console.log("fethced User By email  Successfully")

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    console.log("fethced User By Id Successfully")


    return user;
  } catch {
    return null;
  }
};