import { ApiError } from '@/shared/utils/ApiError';
import User from './users.model';
import { getCurrentUser } from '../auth/auth.service';

export const getPersonalProfile = async (firebaseUid: string) => {
  const user = await User.findOne(
    { firebaseUid },
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      userName: 1,
      avatar: 1,
      bio: 1,
      college: 1,
      course: 1,
      subject: 1,
      university: 1,
      semester: 1,
      isVerified: 1,
      roles: 1,
      preferences: 1,
      stats: 1,
      moderation: 1,
      lastLoginAt: 1,
    }
  ).lean();

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

export const getPublicProfile = async (firebaseUid: string) => {
  const user = await User.findOne(
    { firebaseUid },
    {
      firstName: 1,
      lastName: 1,
      userName: 1,
      avatar: 1,
      bio: 1,
      college: 1,
      course: 1,
      subject: 1,
      university: 1,
      semester: 1,
      isVerified: 1,
      roles: 1,
      stats: 1,
      moderation: 1,
    }
  ).lean();

  if(!user){
    throw new ApiError(404, "User not found");
  }
  return user;
};

export const updateUserProfile = async(firebaseUid:string, updateData:any)=>{
    const updatedUser = await User.findOneAndUpdate(
        {firebaseUid},
        updateData,
        {
            new: true,
            validators:true
        }
    )
    if(!updatedUser){
        throw new ApiError(404, "User not found while updating")
    }

    return updatedUser;
}
