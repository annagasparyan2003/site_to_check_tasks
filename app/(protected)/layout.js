import { Suspense } from 'react';
import Loading from '@/components/spinner';
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default async function AllPage({
    children, // will be a page or nested layout
}) {

    return (

        <>
                <Suspense fallback={<Loading />}>
                    <SessionProvider>
                        <Navbar />

                        {children}
                    </SessionProvider >
                </Suspense>
        </>
    );
}