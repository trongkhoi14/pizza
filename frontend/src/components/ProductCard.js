import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({description,img,name,price}) {
  return (
	<div className='bg-white drop-shadow rounded-md'>
		<Link to="/" className='flex flex-col h-full'>
		<div className=' overflow-hidden rounded-t-md h-[60%]'>
		<img className='w-full h-full hover:scale-125 transition' src={img} alt="" />
		</div>
		<div className='px-2 py-4 flex flex-col flex-1'>
		<h3 className='text-lg font-semibold'>{name}</h3>
		<h4 className='text-sm text-gray-400 line-clamp-2'>{description}</h4>
		<div className='font-bold mt-auto'>{price}</div>
		</div>
		</Link>
  </div>
  )
}
