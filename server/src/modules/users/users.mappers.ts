export const personalProfileResponse = (user: any) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
    avatar: user.avatar,
    bio: user.bio,
    college: user.college,
    course: user.course,
    subject: user.subject,
    university: user.university,
    semester: user.semester,
    isVerified: user.isVerified,
    roles: user.roles,
    preferences: user.preferences,
    stats: user.stats,
    moderation: user.moderation,
    lastLoginAt: user.lastLoginAt
});