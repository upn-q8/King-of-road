import React from 'react'
import HeroSection from './components/HeroSection'
import Brands from './components/Brands'
import Form from './components/Form'

function Page() {
  return (
    <section className='bg-[#F2F2F2] pb-10' >
        <HeroSection />
        <Brands />
        <Form />
    </section>
  )
}

export default Page