"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const ProfileCard = () => {
    const session = useSession();
    const router = useRouter();

    if (session.status === "loading") {
        //replace with a skeleton
        return <div>
            Loading...
        </div>
    }

    if (!session.data?.user) {
        router.push("/")
        return null
    }

    console.log("User image URL: ", session.data?.user?.image);

    return <div className="pt-8 flex ">
        <div className="max-w-xl bg-white rounded shadow w-full p-12">
            <Greeting
            image={session.data?.user?.image ?? ""}
            name={session.data?.user?.name ?? ""} 
            />
            <Assets />
        </div>
    </div>
}

function Assets() {
    return <div className="text-slate-500 mt-4 ">
        Account assets
    </div>
    
}


function Greeting({
    image, name
}: {
    image: string, name: string
}) {
    return <div className="flex p-12">
        <img src={image} className="rounded-full w-16 h-16 mr-4" />
        <div className="text-2xl font-semibold flex flex-col justify-center">
           Welcome back, {name}
        </div>
    </div>
}
