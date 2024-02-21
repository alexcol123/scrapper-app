'use client'



import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const heroImages = [
  { imgUrl: '/assets/images/1.webp', alt: 'tops' },
  { imgUrl: '/assets/images/2.webp', alt: 'bag' },
  { imgUrl: '/assets/images/3.webp', alt: 'pants' },
  { imgUrl: '/assets/images/4.webp', alt: 'shirts' },
]


const HeroCarousel = () => {
  return (
    <div className='hero-carousel'>
      <Carousel showThumbs={false} autoPlay infiniteLoop interval={2000} showArrows={false} showStatus={false}>

        {heroImages.map((image) => (
          <Image key={image.alt} src={image.imgUrl} width={484} height={484} alt={image.alt} className='object-contain' />
        ))}

      </Carousel>

      <Image className='max-xl:hidden  absolute  -left-[15%] bottom-0 z-0' src={'/assets/icons/hand-drawn-arrow.svg'} alt='arrow' width={175} height={175} />
    </div>
  )
}

export default HeroCarousel
