import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import {assets} from '.././assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title  text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-1/2 m-auto sm:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to SnapCart, your ultimate fashion destination! We are dedicated to offering you the latest trends in clothing, with a focus on style, quality, and affordability. From everyday essentials to statement pieces, our collections are carefully curated to ensure you always find something that suits your taste.</p>
          <p>At SnapCart, we believe that fashion should be accessible to everyone. We strive to bring you a seamless shopping experience, where you can discover a wide range of clothing options that cater to every occasion, delivered right to your doorstep.</p>
          <p className='text-gray-800 font-bold'>Our Mission</p>
          <p>Our mission is to inspire confidence and individuality through fashion. We aim to provide high-quality, stylish clothing that empowers people to express their unique sense of style. By offering a diverse range of affordable options, we strive to make fashion accessible to everyone, while delivering an exceptional shopping experience every time.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p className='font-bold'>Quality Assurance:</p>
          <p className='text-gray-600'>We ensure high-quality, durable clothing through strict inspections, partnering with trusted suppliers for well-crafted, lasting products.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p className='font-bold'>Convenience:</p>
          <p className='text-gray-600'>Enjoy seamless shopping with a user-friendly site, secure payments, fast shipping, and hassle-free returns for maximum convenience.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p className='font-bold'>Exceptional Customer Service:</p>
          <p className='text-gray-600'>Our support team provides prompt, personalized assistance to ensure a smooth, satisfying shopping experience from start to finish.</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About