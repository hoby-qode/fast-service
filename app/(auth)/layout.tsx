import Image from 'next/image'
import React from 'react'
import FormAnonyme from './anonyme/FormAnonyme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="login-layout vh-100 mb-0 py-4 ">
        <div className="h-100 container d-flex justify-content-between flex-column">
          <div
            className="text-right"
            style={{
              color: '#fff',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {/* <Link href="/anonyme" className='flex items-center'>
              Continuer en anonyme <AiOutlineArrowRight style={{marginLeft:'5px'}} />  
            </Link> */}
            <FormAnonyme />
          </div>
          <div className="row">
            <div className="col-md-6 mt-5">
              <div className="text-center mb-4">
                <Image
                  src="/images/logo/logo-fast-service.svg"
                  alt="logo fast service"
                  width={211}
                  height={60}
                  style={{ height: 'auto' }}
                />
              </div>
            </div>
            <div className="col-md-6">{children}</div>
          </div>
        </div>
      </main>
    </>
  )
}
