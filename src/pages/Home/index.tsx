import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import {
  CountdownCOntainer,
  FormContainer,
  HomeContainer,
  MinutesAmonutInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

export function Home() {
  const { register, watch, handleSubmit } = useForm()

  function handleCreateNewCycle(date: any) {
    console.log(data)
  }

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownCOntainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
