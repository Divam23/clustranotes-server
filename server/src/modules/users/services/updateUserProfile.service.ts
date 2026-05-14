import { ApiError } from "@/shared/utils/ApiError";
import User from "../users.model";

export const updateUserProfile = async(firebaseUid:string, updateData:any)=>{
    const updatedUser = await User.findOneAndUpdate(
        {firebaseUid},
        updateData,
        {
            new: true,
            validators:true
        }
    ).lean()
    
    if(!updatedUser){
        throw new ApiError(404, "User not found while updating")
    }

    return updatedUser;
}