export type User = {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    profilePicture: string,
    bio: string,
    createdAt: string,
    updatedAt: string,
    followers: string[],
    following: string[],
}

export type SignupData = {
    email: string,
    password: string,
    password_confirm: string,
    accept_guidelines: boolean,
}