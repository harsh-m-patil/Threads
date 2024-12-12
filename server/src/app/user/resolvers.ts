import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphQLContext } from "../../interfaces";

interface GoogleTokenResult {
  iss?: string; // Issuer of the token
  azp?: string; // Authorized party (client ID)
  aud?: string; // Audience (client ID)
  sub?: string; // Subject (unique identifier for the user)
  email: string; // Email address of the user
  email_verified: string; // Indicates if the email is verified ('true' or 'false')
  nbf?: string; // Not before timestamp
  name?: string; // Full name of the user
  picture?: string; // URL of the user's profile picture
  given_name: string; // Given name (first name) of the user
  family_name?: string; // Given name (first name) of the user
  iat?: string; // Issued at timestamp
  exp?: string; // Expiration timestamp
  jti?: string; // JWT ID (unique identifier for the token)
  alg?: string; // Algorithm used to sign the token
  kid?: string; // Key ID used to verify the token
  typ?: string; // Type of the token (JWT)
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOauthURL.searchParams.set("id_token", googleToken);

    const { data } = await axios.get<GoogleTokenResult>(
      googleOauthURL.toString(),
      {
        responseType: "json",
      },
    );

    // Check if user exists
    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    // if not create a new user
    if (!user) {
      await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImageURL: data.picture,
        },
      });
    }

    // get the user from DB
    const userInDb = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    // check for null
    if (!userInDb) {
      throw new Error("User with email not found");
    }

    // create a token
    const userToken = JWTService.generateTokenForUser(userInDb);

    return userToken;
  },

  getCurrentUser: async (parent: any, args: any, ctx: GraphQLContext) => {
    const id = ctx.user?.id;
    if (!id) return null;

    const user = await prismaClient.user.findUnique({ where: { id: id } });
    return user;
  },
};

export const resolvers = { queries };
