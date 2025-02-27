import Logout from "@/components/Logout";
import { auth } from "@/auth";

import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-col items-center m-4">
      <h1 className="text-3xl my-2">
        Welcome, {session?.user?.email} & {session?.user?.name}
      </h1>

      <Logout />
    </div>
  );
};

export default HomePage;
