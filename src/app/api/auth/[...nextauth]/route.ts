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
    callbacks: {
        async signIn({ user }: { user: User }) {
          await connectToDatabase();
          console.log(user);
          try {
            
            const existingUser = await SessionModel.findOne({ email: user.email });
            if (!existingUser) {
              
              await SessionModel.create({
                name: user.name, 
                email: user.email, 
                image: user.image, 
                date: new Date(),
              });
            } else {
              
              await SessionModel.findOneAndUpdate(
                { email: user.email },
                {
                  name: user.name, 
                  email: user.email, 
                  image: user.image, 
                  date: new Date(),
                },
                { new: true }
              );
            }
          } catch (error) {
            console.error("Error al crear o actualizar el usuario:", error);
        
          }
          return true;
        },
      },
      
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
