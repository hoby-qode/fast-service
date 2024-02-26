'use client'
import React from 'react'
import localFont from 'next/font/local'
const raleway = localFont({
  src: [
    {
      path: '../public/fonts/raleway/Raleway-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/raleway/Raleway-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/raleway/Raleway-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/raleway/Raleway-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/raleway/Raleway-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/raleway/Raleway-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/raleway/Raleway-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/raleway/Raleway-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/raleway/Raleway-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
  ],
})

const poppins = localFont({
  src: [
    {
      path: '../public/fonts/poppins/Poppinsbold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/poppins/Poppinsmedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/poppins/Poppinsregular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})

const FontFamily = () => {
  return (
    <style jsx global>
      {`
        html,
        body {
          font-family: ${raleway.style.fontFamily};
          font-weight: 300;
        }
        :root {
          --raleway: ${raleway.style.fontFamily};
          --poppins: ${poppins.style.fontFamily};
        }
      `}
    </style>
  )
}

export default FontFamily
