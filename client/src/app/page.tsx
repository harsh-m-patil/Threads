import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitterX } from "react-icons/bs";
import FeedCard from "./components/FeedCard";

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
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
