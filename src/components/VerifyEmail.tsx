"use client"

import {trpc} from "@/trpc/client";
import {Loader2, XCircle} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

interface VerifiedEmailProps {
    token: string
}

const VerifyEmail = ({token}: VerifiedEmailProps) => {
    const {data, isLoading, isError} = trpc.auth.verifyEmail.useQuery({
        token
    })

    // isError state
    if(isError) {
        return (
            <div className={"flex flex-col items-center gap-2"}>
                <XCircle className={"h-8 w-8 text-red-600"} />
                <h3 className={"font-semibold text-xl"}>There was a problem</h3>
                <p className={"text-muted-foreground text-sm text-center"}>
                    This token is not valid or might be expired.<br/>
                    Please try again.
                </p>
            </div>
        )
    }

    // success state
    if(data?.success){
        return(
            <div className={"flex h-full flex-col items-center justify-center"}>
                <div className={"relative mb-4 h-60 w-60 text-muted-foreground"}>
                    <Image
                        src={"/hippo-email-sent.png"}
                        alt={"email was sent"}
                        fill
                    />
                </div>
                <h3 className={"font-semibold text-2xl"}>
                    You&apos;re all set!
                </h3>
                <p className={"text-muted-foreground text-center"}>
                    Thank you for verifying your email!
                </p>
                <Link
                    href={"/sign-in"}
                    className={buttonVariants({
                        className: "mt-4"
                    })}
                >
                    Sign in
                </Link>
            </div>
        )
    }

    // isLoading state
    if(isLoading){
        return (
            <div className={"flex flex-col items-center gap-2"}>
                <Loader2 className={"animate-spin h-8 w-8 text-zinc-300"} />
                <h3 className={"font-semibold text-xl"}>
                    Verifying...
                </h3>
                <p className={"text-muted-foreground text-sm text-center"}>
                    This won&apos;t take long.
                </p>
            </div>
        )
    }
}

export default VerifyEmail