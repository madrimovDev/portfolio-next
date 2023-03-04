import React from 'react'

const Skills = () => {
	return (
		<div className='py-10'>
			<h4 className='text-center md:text-right'>
				Skills 🛠
			</h4>

			<div className='mt-10 flex flex-col md:flex-row flex-wrap gap-6 md:gap-10 items-stretch content-start justify-start'>
				<ul className='list-disc w-full md:w-auto border p-4 rounded-md border-gray-700 flex-grow dark:text-white list-inside flex flex-col gap-2'>
					<li className='text-xl text-gray-400 list-none'>
						Basic
					</li>
					<li>HTMl, CSS</li>
					<li>Sass/SCSS, Less</li>
					<li>Bootstrap</li>
					<li>Tailwindcss</li>
				</ul>
				<ul className='list-disc w-full md:w-auto border p-4 rounded-md border-gray-700 flex-grow dark:text-white list-inside flex flex-col gap-2'>
					<li className='text-xl text-gray-400 list-none'>
						Languages
					</li>
					<li>Javascript</li>
					<li>Typescript</li>
				</ul>
				<ul className='list-disc w-full md:w-auto border p-4 rounded-md border-gray-700 flex-grow dark:text-white list-inside flex flex-col gap-2'>
					<li className='text-xl text-gray-400 list-none'>
						Framework & Library
					</li>
					<li>ReactJS</li>
					<li>NextJS</li>
					<li>SvelteJS</li>
					<li>NodeJS</li>
					<li>ExpressJS</li>
					<li>JQuery</li>
				</ul>
				<ul className='list-disc w-full md:w-auto border p-4 rounded-md border-gray-700 flex-grow dark:text-white list-inside flex flex-col gap-2'>
					<li className='text-xl text-gray-400 list-none'>
						State Management
					</li>
					<li>Redux</li>
					<li>Redux-toolkit</li>
					<li>MobX</li>
					<li>Zustand</li>
					<li>CantextAPI</li>
				</ul>
				<ul className='list-disc w-full md:w-auto border p-4 rounded-md border-gray-700 flex-grow dark:text-white list-inside flex flex-col gap-2'>
					<li className='text-xl text-gray-400 list-none'>
						Additional Skills
					</li>
					<li>UI/UX</li>
					<li>Gsap</li>
					<li>Framer-motion</li>
				</ul>
			</div>
		</div>
	)
}

export default Skills
