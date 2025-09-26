'use client'
import { Card } from '@/components/ui/card'
import React, { use } from 'react'
import Image from 'next/image'
import { CardContent } from '@/components/ui/card'
import Logo from '@/public/assets/images/logo-black.png'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { zSchema } from '@/lib/zodSchems'
const LoginPage = () => {
  const formSchema = zSchema.pick({email: true, password: true})
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
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