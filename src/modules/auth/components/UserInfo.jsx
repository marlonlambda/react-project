import { User, Link } from "@heroui/react";
import { useSelector } from "react-redux";

export const UserInfo = ({ isOpen }) => {
    const { user } = useSelector(state => state.auth);
    const { first_name, last_name, email } = user   

    return (
        <div className="flex items-center transition duration-700">
            <User
                className={`text-black w-full flex justify-start items-center bg-blue-700/15  p-2 border border-black/5 shadow-sm ${
                    !isOpen ? "justify-center p-0 w-10 h-10 rounded-full border-none bg-transparent shadow-none" : ""
                }`}
                avatarProps={{
                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                }}
                name={isOpen ? `${first_name} ${last_name}` : ""}
                description={
                    isOpen ? (
                        <Link className="text-blue-500 text-xs" isExternal href="https://x.com/jrgarciadev" size="sm">
                            { email }
                        </Link>
                    ) : null
                }
            />
        </div>
    );
};
