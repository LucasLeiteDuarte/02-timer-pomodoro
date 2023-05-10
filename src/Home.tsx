import { createContext, useContext } from 'react' // como se  fosse uma variável compartilhada entre dois componentes
const CyclesContext = createContext({
  activeCycle: 1,
})

function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  return <h1>NewCycleForm: {activeCycle}</h1>
}

function Countdown() {
  const { activeCycle } = useContext(CyclesContext)
  return <h1>Countdown: {activeCycle}</h1>
}

export function Home() {
  return (
    <div>
      <NewCycleForm />
      <Countdown />
    </div>
  )
}
