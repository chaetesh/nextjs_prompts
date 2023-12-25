const { default: nextAuth } = require("next-auth");
import User from "@models/user";
import { connectToDB } from "@utils/database";
import GoogleProvider from "next-auth/providers/google";

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "696143322559-p8jiud66dssq4eooiu932b92msl2hdpr.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],

  secret: "jdBQ7gqx2bgAZRcXZoWBE31y6T0763/TxgWRM4zcDa4=",

  callbacks:{
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
  
      return session;
    },
  
    async signIn({ profile }) {
      try {
        await connectToDB();
        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });
  
        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
  
        return true;
      } catch (error) {
          console.log(error);
          return false;
      }
    },
  }

});

export {handler as GET, handler as POST};