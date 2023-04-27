import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'

import {
  CountdownCOntainer,
  FormContainer,
  HomeContainer,
  MinutesAmonutInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  MinutesAmonutInput: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, watch, handleSubmit, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      MinutesAmonutInput: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu Projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Pojeto 1" />
            <option value="Pojeto 2" />
            <option value="Pojeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmonutInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownCOntainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownCOntainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
