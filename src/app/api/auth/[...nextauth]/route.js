import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name : "Credentials",
          credentials : {
            username : {
              label : "Email",
              type : "email",
              name : "email"
            },
            password :{
              label : "Password",
              type : "password",
              name : "password"
            }
          },
          async authorize(credentials,req){
            const {email,password} =credentials;
            try {
             const response = await axios({
                method : "get",
                url : `${process.env.NEXT_PUBLIC_ENDPOINT}/api/user?email=${email}&password=${password}`
              });
              return response.data.data.user;
            } catch (error) {
              return null;
            }
            
            
            /* return {
              name : "Alok",
              email : "a@gmail.com",
              image : "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png"
            }  */
           
          }
        }),
        GoogleProvider({
          clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET
          }),
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
          })
      ],
      secret : process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
      pages : {
        signIn : "/login"
      },
      session : {
        jwt : true
      }
})

export {handler as GET, handler as POST}