import { useTheme } from '@chakra-ui/react'

import BoxGrid from '~/components/box-grid'
import PostPreview from '~/components/post-preview'

export default function Home() {
  const theme = useTheme()
  const {
    colours: { blue },
  } = theme

  return (
    <div className="flex flex-col items-end justify-between h-full">
      <section className="flex flex-col gap-2">
        <PostPreview />
        <PostPreview right />
        <PostPreview />
      </section>
      <BoxGrid colour={blue} />
    </div>
  )
}
