import {DecodedIdToken} from "firebase-admin/auth"
import User from "../users/users.model";
import { fullNameToFirstNameAndLastName } from "@/shared/helpers/fullNameSplitter.helper";

export const findOrCreateUser = async(decodedUser: DecodedIdToken)=>{
    let user = await User.findOne({
        firebaseUid: decodedUser.uid,
    })


    if(!user){
        const {firstName, lastName} = fullNameToFirstNameAndLastName(decodedUser.name || "")

        user = await User.create({
            firebaseUid : decodedUser.uid,
            email:decodedUser.email,
            firstName:firstName,
            lastName:lastName,
            avatar:decodedUser.picture
        })
    }

    return user;
}

export const getCurrentUser = async(decodedUser: DecodedIdToken)=>{
    const user = await User.findOne({
        firebaseUid: decodedUser.uid,
    })

    return user;
}