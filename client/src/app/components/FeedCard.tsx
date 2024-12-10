import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";

const FeedCard = () => {
  return (
    <div className="cursor-pointer border border-b-0 border-l-0 border-r-0 border-gray-700 p-4 transition-all hover:bg-slate-900">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/135024692?v=4"
            alt="user-image"
            className="rounded-full"
            height={50}
            width={50}
          />
        </div>
        <div className="col-span-11">
          <h5>Harshwardhan Patil</h5>
          <p>
            Every person who works in tech needs at least 5 nontech friends to
            interact with closely on a weekly basis so they can understand how
            the general public actually thinks
          </p>
          <div className="mt-5 flex w-[90%] items-center justify-between p-2 text-xl">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
