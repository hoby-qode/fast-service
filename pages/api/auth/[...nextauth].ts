import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            mutation LoginUser {
                login( input: {
                clientMutationId: "uniqueId",
                username: "${credentials?.username}",
                password: "${credentials?.password}"
                }){
                    authToken
                    refreshToken
                    user {
                        id
                        name
                        email
                    }
                }
            }
            `,
          }),
        });
        const user = await res.json();
        
        if (user.data.login.user) {
          // Any object returned will be saved in `user` property of the JWT
          const auth = user.data.login.user;
          auth.accessToken = user.data.login.refreshToken;
          return auth;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt"
  }
  
});

