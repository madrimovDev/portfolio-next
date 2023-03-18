import { Section } from '@/components/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Blog = () => {
	const { id } = useRouter().query
	return (
		<Section title='Lorem ipsum dolor sit.'>
			<Image
				src='https://api.lorem.space/image/house'
				alt='House'
				width={500}
				height={300}
				className='w-full h-[300px] object-cover rounded-md overflow-hidden'
			/>
			<p className='leading-loose text-base tracking-widest mt-10'>
				Lorem ipsum dolor sit amet, consectetur adipisicing
				elit. Ullam dicta ut architecto reiciendis molestiae
				magni reprehenderit rerum assumenda deleniti,
				voluptatibus impedit, eveniet ipsum? Corrupti
				molestiae iste ullam veritatis, fugit quam quis
				nostrum eaque quasi tempore magni ipsa non dicta
				distinctio delectus recusandae ipsum velit neque?
				Nemo, fugiat laboriosam inventore quas maxime saepe
				cupiditate, porro quod temporibus possimus accusamus
				quaerat? Culpa libero, aspernatur distinctio dolorum
				aliquam saepe earum suscipit hic qui fuga recusandae
				maiores nisi rerum consequuntur doloribus nam nulla
				vero facere! Dolorem distinctio id voluptatum
				perferendis non adipisci quam nesciunt dolor nihil.
				Animi eaque illum nulla iusto error corrupti illo
				cumque minus quibusdam explicabo tempora, aut rem
				iure rerum, delectus, eveniet reiciendis harum nihil
				quam fuga quo ratione temporibus. Ducimus
				dignissimos, explicabo commodi repellat recusandae
				dicta, facere sapiente natus velit minima obcaecati
				sit. Corrupti nam, esse laboriosam exercitationem
				repellat voluptatibus asperiores. Quasi eos
				consequuntur natus nam non minima perspiciatis odit
				porro laboriosam ab ipsa molestiae et
				exercitationem, suscipit nesciunt, iure laudantium
				adipisci similique fuga ut nemo. Cumque reiciendis
				doloribus fugit necessitatibus repellendus corrupti
				maiores in unde, dolore quae incidunt molestias
				corporis culpa nam facilis porro eos quidem odit!
				Quod est quam recusandae, at dolore molestiae
				distinctio facilis ipsa nostrum et. Eaque possimus,
				iusto quae fugiat ex quis alias excepturi molestiae
				nam libero optio eligendi ullam ad neque, corrupti
				harum tempore, voluptate dolore similique earum!
				Porro, inventore dolor iusto voluptatem nam neque
				dolore quam libero quas ipsam itaque corrupti
				placeat ut. Repellat a mollitia nulla delectus
				doloremque, numquam consequatur. Eaque nesciunt et
				corporis quas quaerat, ea nulla fugiat obcaecati
				modi beatae veniam debitis officiis, sed, nisi rerum
				libero vel. Placeat facere tenetur nulla quis
				perspiciatis eaque sequi nobis maiores quas
				recusandae fugit unde consequatur, exercitationem
				nostrum atque, itaque reiciendis aut. Expedita alias
				excepturi voluptas praesentium, nobis nemo numquam
				necessitatibus nesciunt soluta vero aperiam
				voluptatem quos quisquam recusandae nam unde debitis
				ipsum laboriosam vitae autem tenetur eaque minus.
				Ipsam eius doloremque officiis, eum soluta animi in
				doloribus nostrum sed odit. Illo odit placeat
				suscipit autem et sit cum accusamus itaque cumque
				adipisci numquam iusto rem recusandae, veniam
				voluptatum, voluptas facere ex neque impedit, animi
				unde distinctio cupiditate eum non? Facilis
				consequuntur, doloribus totam in aut sequi similique
				molestiae pariatur quas ab qui dolorum architecto
				aspernatur? Fugiat in consequatur iusto ad
				consequuntur quam esse tempora veniam impedit modi
				aspernatur placeat neque nobis beatae inventore
				dolorum distinctio adipisci repellat, minus natus
				unde fugit. Repellat esse, incidunt, consequuntur
				voluptatibus delectus voluptatum voluptate
				repudiandae animi, libero adipisci non maiores?
				Error illum aut, impedit sed quod reiciendis quo
				porro incidunt sit suscipit explicabo rem odit
				voluptas, atque saepe mollitia ipsum iste ut, fugiat
				facilis necessitatibus similique! Doloribus
				veritatis facilis amet pariatur nemo quam deserunt
				sed illum nesciunt, dolorum necessitatibus quaerat
				animi quos magni nam soluta. Totam aperiam
				consequuntur quia nulla repellat odio minima natus
				non! Deserunt quod possimus enim ad laboriosam.
				Corporis quibusdam magni hic nihil fugiat corrupti
				sed, quo quis culpa, maxime deserunt consequuntur.
				Earum dolore officia voluptates minus corporis
				doloremque fugit aperiam sint corrupti excepturi!
			</p>

			<div className='flex flex-col gap-6 mt-10'>
				<p>Comments</p>
				<div className='p-4 bg-gray-400/10 rounded-md'>
					<p className='mb-4'>email@mail.com</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur
						adipisicing elit. Rerum quisquam enim dolorem,
						asperiores pariatur vel cumque officia inventore
						blanditiis esse.
					</p>
				</div>
				<div className='p-4 bg-gray-400/10 rounded-md'>
					<p className='mb-4'>email@mail.com</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur
						adipisicing elit. Rerum quisquam enim dolorem,
						asperiores pariatur vel cumque officia inventore
						blanditiis esse.
					</p>
				</div>
				<div className='p-4 bg-gray-400/10 rounded-md'>
					<p className='mb-4'>email@mail.com</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur
						adipisicing elit. Rerum quisquam enim dolorem,
						asperiores pariatur vel cumque officia inventore
						blanditiis esse.
					</p>
				</div>

				<form className='flex flex-col gap-4'>
					<input
						className='bg-gray-400/50'
						type='email'
						placeholder='email'
					/>
					<textarea
						name='comment'
						className='bg-gray-400/50'
						id=''
          ></textarea>
          <button>Comment</button>
				</form>
			</div>
		</Section>
	)
}

export default Blog
