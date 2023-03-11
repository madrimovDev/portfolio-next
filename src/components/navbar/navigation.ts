interface Navigation {
  id: string | number
  title: string,
  slug: string
}

const navigation: Navigation[] = [
  {
    id: 1,
    title: 'Works',
    slug: '/works'
  },
  {
    id: 2,
    title: 'Blogs',
    slug: '/blogs'
  },
]

export default navigation