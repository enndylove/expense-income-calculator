import { createFileRoute } from '@tanstack/react-router'
import BlurText from "@react-bits/BlurText/BlurText";
import ShinyText from '@components/Bits/ShinyText/ShinyText';


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className='w-full min-h-lvh flex flex-col items-center justify-center'>
      <BlurText
        text="Income and expense calculator"
        delay={60}
        animateBy="words"
        direction="top"
        className="text-5xl text-white font-sans font-semibold"
      />

      <ShinyText text="🚀 Just some shiny text!" disabled={false} speed={5} className='mt-6 font-sans' />

    </div>
  )
}
