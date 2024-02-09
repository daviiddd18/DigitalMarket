import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectToDatabase } from "@/app/db/ConnectToDatabase";
import { SessionModel } from "@/app/db/models/SessionModel";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    
          
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
