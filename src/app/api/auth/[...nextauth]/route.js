import User from "@/models/User";
import connectMongoDB from "@/utils/mongoDb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connectMongoDB();

        try {
          const user = await User.findOne({ username: credentials.username });
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (user && isPasswordCorrect) {
            return { id: user._id, username: user.username };
          } else {
            throw new Error("Wrong Credentials");
          }
        } catch (error) {
          throw new Error("Mongo err", error);
        }
      },
    }),
  ],
  pages: {
    error: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
