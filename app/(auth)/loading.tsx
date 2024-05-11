import Loader from '@/components/loader'
import Image from 'next/image'

export default function Loading() {
  return <div className="h-100 w-100 d-flex align-items-center justify-content-center">
    <Image src="/images/logo/logo-fast-service.svg" alt="logo fast service" width={211} height={60} style={{ height: 'auto' }}/>
    <Loader />
  </div>
}
