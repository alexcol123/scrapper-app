import axios from "axios"
import * as cheerio from "cheerio"
import { convertImageUrl, extractPrice } from "../utils"

export async function scrapedAmazonProduct(url: string) {
  if (!url) return

  // BrightData proxy config
  const username = String(process.env.BRIGHT_DATA_USERNAME)
  const password = String(process.env.BRIGHT_DATA_PASSWORD)

  const port = 22225
  const session_id = (1000000 * Math.random()) | 0

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false
  }

  try {

    // Fetch the product
    const response = await axios.get(url, options)

    const $ = cheerio.load(response.data)

    // Extract product data from HTML 

    const title = $('div.flex.flex-col.items-start > h2.text-xl.font-medium').text().trim()
    const currentPrice = extractPrice($('div.flex.items-center > h2.font-light > span:nth-child(2)'))
    const originalPrice = extractPrice($('div.flex.items-center > h2.font-light > span:nth-child(1)'))
    const brand = $('div.badge.badge-neutral.uppercase.px-4.py-1').text().trim()
    const isOutOfStock = $('div:nth-child(6) > span.text-success.px-2.rounded-sm').text().trim() !== "In Stock"
    const image = convertImageUrl($('.relative.overflow-hidden.h-fit img').attr('src'))


    //document.querySelector("body > div > main > div > div:nth-child(1) > div.grid.grid-cols-1.lg\\:grid-cols-2.gap-2.lg\\:gap-10.rounded.border.overflow-hidden > div.flex.flex-col.items-start.justify-center.gap-3.md\\:gap-4.p-2.md\\:p-3 > div.text-sm.md\\:text-md > div:nth-child(2)")

    const category = $('div.text-sm > div:nth-child(2)').text().trim().split(':')[1] 


    console.log(' ================================================================================================================================================================================================================================================================================================================================================================================================================================  ')
    console.log(category)

    console.log('-----------------------------')

    const currency = ($('div.flex.items-center > h2.font-light > span:nth-child(2)')).text().trim().slice(0, 1) || '$'

    const description = $('.text-justify.opacity-80.leading-5').text().trim()


    // construct data object with scraped information

    const data = {
      url,
      title,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice),
      brand,
      isOutOfStock,
      category,
      image,
      currency,
      description,
      priceHistory: [],
      reviewsCount: 94,
      stars: 4.6,
      discountRate: 0,

      // Tracking data
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),

    }

    return data


  } catch (error: any) {
    throw new Error(`Failed to scrape the  product: ${error.message}`)
  }
}
