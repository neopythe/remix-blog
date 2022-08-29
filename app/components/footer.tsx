import { useTheme } from '@chakra-ui/react'
import { BsGithub } from 'react-icons/bs'

export default function Footer() {
  const theme = useTheme()
  const {
    colours: { blue },
  } = theme

  return (
    <footer className="flex justify-center items-center h-24 bg-brand-blue-500 text-white">
      <div className="flex items-center justify-center gap-8 w-full">
        <div className="flex flex-col items-center">
          <span className="melody-bold">
            Remix <span style={{ color: blue[200] }}>Blog</span>
          </span>
          <span className="flex items-center gap-2 font-bold text-xl">
            <span>&#123;</span>
            <span
              style={{ color: blue[100] }}
              className="font-semibold text-sm pt-1"
            >
              {new Date().getFullYear()}
            </span>
            <span>&#125;</span>
          </span>
        </div>
        <a href="https://github.com/neopythe">
          <BsGithub size={32} />
        </a>
      </div>
    </footer>
  )
}
