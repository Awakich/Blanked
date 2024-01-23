"use client"

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

const Home = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <main>
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton>
            <Button variant={"default"} size={"sm"}>Log in</Button>
          </SignInButton>

          <SignInButton>
            <Button variant={"outline"} size={"sm"}>Get Blanked for Free</Button>
          </SignInButton>
        </>
      )}
      {isAuthenticated && !isLoading && (
        <UserButton afterSignOutUrl="/" />
      )}
    </main>
  );
}
export default Home;