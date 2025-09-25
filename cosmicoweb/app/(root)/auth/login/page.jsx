import { Card } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import { CardContent } from '@/components/ui/card'
import Logo from '@/public/assets/images/logo-black.png'
const LoginPage = () => {
  return (
    <Card className="w-[450px]">
        <CardContent>
            <div className='flex justify-center'>
            <Image src={Logo.src} width={Logo.width} height={Logo.height} alt='Logo' className='max-w-[150px]' />
            </div>
            <div className='text-center'>
                <h1 className='text-3xl font-semibold'>
                    Login into your account
                </h1>
                <p>Login into your account by filling out the form below</p>
            </div>

        </CardContent>
    </Card>
  )
}

export default LoginPage