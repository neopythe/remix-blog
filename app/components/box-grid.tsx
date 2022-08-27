import { Box } from '@chakra-ui/react'

export default function BoxGrid({ colour }: { colour: string }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col justify-end gap-4">
        <Box height={8} width={8} backgroundColor={colour[100]} />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <Box height={8} width={8} backgroundColor={colour[100]} />
        <Box height={8} width={8} backgroundColor={colour[300]} />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <Box height={8} width={8} backgroundColor={colour[100]} />
        <Box height={8} width={8} backgroundColor={colour[300]} />
        <Box height={8} width={8} backgroundColor={colour[500]} />
      </div>
    </div>
  )
}
