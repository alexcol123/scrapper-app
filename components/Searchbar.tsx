'use client'

import { scrapeAndStoreProduct } from '@/lib/actions'
import React, { useState, FormEvent } from 'react'

const Searchbar = () => {


  const [searchPrompt, setsearchPrompt] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const isValidHandbagStoreLink = (url: string) => {
    const parsedURL = new URL(url)

    let isValid = parsedURL.hostname.includes('handbagstore-test-3')

    return isValid

  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValidLink = isValidHandbagStoreLink(searchPrompt)

    if (!isValidLink) alert("Please enter a valid url from site:  https://handbagstore-test-3.vercel.app/ ")


    try {
      setisLoading(true)

      // Scrape product 

      const product = await scrapeAndStoreProduct(searchPrompt)
    } catch (error) {

    } finally {
      setisLoading(false)
    }
  }

  return (
    <form className='flex flex-wrap gap-4 mt-12 '
      onSubmit={handleSubmit}
    >
      <input type="text" placeholder='Enter product link' className='searchbar-input'
        value={searchPrompt}
        onChange={e => setsearchPrompt(e.target.value)}
      />

      <button
        disabled={searchPrompt === '' || isLoading}
        type="submit" className="searchbar-btn">{isLoading ? 'Searching...' : 'Search'}</button>
    </form>
  )
}

export default Searchbar
