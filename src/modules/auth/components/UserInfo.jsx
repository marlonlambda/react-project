import { User, Link } from "@heroui/react";

export const UserInfo = () => {
    return (
        <User
            className="text-white rounded-full bg-gray-700 pl-2 pr-4 border border-gray-900 shadow-xl"
            avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
            }}
            description={
                <Link className="text-gray-80 text-xs" isExternal href="https://x.com/jrgarciadev" size="sm">
                    @jrgarciadev
                </Link>
            }
            name="Junior Garcia"
        />
    );
}
