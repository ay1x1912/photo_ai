import {
    createAuthClient
} from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,

})


const signInWithGoogle = async () => {
    console.log("try with google")
    const data = await authClient.signIn.social({
        provider: "google"
    })
}

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;

export default signInWithGoogle