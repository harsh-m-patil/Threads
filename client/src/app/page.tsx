"use client";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitterX } from "react-icons/bs";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FeedCard from "./components/FeedCard";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google Token not found`);

      const { verifyGoogleToken } = await graphQLClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        },
      );

      toast.success("Verified Success");

      if (verifyGoogleToken) {
        window.localStorage.setItem("__threads_token", verifyGoogleToken);
        // NOTE: Invalidate and make the request again
        await queryClient.invalidateQueries(["current-user"]);
      }
    },
    [queryClient],
  );

  return (
    <div>
      <div className="grid h-screen w-screen grid-cols-12 px-48">
        <div className="col-span-3 ml-28 justify-start px-4 pt-2">
          <div className="h-fit w-fit cursor-pointer rounded-full p-3 text-2xl transition-all hover:bg-gray-800">
            <BsTwitterX />
          </div>
          <div className="mt-2 text-xl font-medium">
            <ul>
              {sidebarMenuItems.map((item, index) => (
                <li
                  key={index}
                  className="mt-2 flex w-fit cursor-pointer items-center justify-start gap-4 rounded-full px-5 py-2 transition-all hover:bg-gray-800"
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <button className="mt-5 w-4/6 rounded-full bg-slate-100 py-2 text-lg text-black">
              Post
            </button>
          </div>
          <div className="absolute bottom-5">
            {user && (
              <div className="mt-5 flex w-fit items-center gap-3 rounded-2xl bg-slate-900 px-7 py-2">
                <Image
                  className="rounded-full"
                  src={user.profileImageURL}
                  alt={user.firstName}
                  width="50"
                  height="50"
                />
                <span>{user.firstName}</span>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-5 h-screen overflow-y-scroll border border-gray-800">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          {!user && (
            <div className="rounded-lg bg-slate-700 p-5">
              <h1 className="my-2 text-2xl">New to Threads?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
