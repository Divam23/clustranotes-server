import { IUser } from "../types/user.types";

export const mapPublicProfileResponse = (user:IUser)=>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    college: user.college,
    course: user.course,
    subject: user.subject,
    university: user.university,
    semester: user.semester,
    isVerified: user.isVerified,
    roles: user.roles,
    stats: user.stats,
    moderation: user.moderation,
    lastLoginAt:user.lastLoginAt,
    lastUpdatedAt:user.lastUpdated,
})