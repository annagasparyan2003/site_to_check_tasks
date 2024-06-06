'use server'
import { Suspense } from 'react'
import Loading from "@/components/spinner";
import { LoadTypesPublication } from '@/data/load-types-publication';

import dynamic from 'next/dynamic';
const SendWorkForm = dynamic(() => import('@/components/send-work-form'), {
  ssr: true,
});

export default async function Send_work({ params }) {

  const items = await LoadTypesPublication();
  return (
    <>


        <Suspense fallback={<Loading />}>
          <SendWorkForm options_Type_Publication={items} />
        </Suspense>
    </>
  )
}