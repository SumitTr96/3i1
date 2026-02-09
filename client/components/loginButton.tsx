"use client"

import Link from "next/link";
import {useRouter} from "next/navigation";

type LoginButtonProps = {
    label?: string
}

export default function LoginButton({label="Login"}:LoginButtonProps){
    const router = useRouter();

    return(
        <Link href="/login">{label}</Link>
    )
}