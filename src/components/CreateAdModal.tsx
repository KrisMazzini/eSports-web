import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Game } from '../App'
import { Input } from './Form/Input'

import { weekDays } from '../utils/weekDays'

import { Check, GameController } from 'phosphor-react'

interface AdModalProps {
  games: Game[]
}

export function CreateAdModal({games}:AdModalProps) {
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([])
  
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publish an ad</Dialog.Title>
          <form className='mt-8 flex flex-col gap-4'>

            <div className='flex flex-col gap-2'>
              <label htmlFor="game" className='font-semibold'>Which game?</label>
              <select 
                id="game" 
                className='bg-zinc-900 py-3 px-4 rounded text-sm appearance-none'
                defaultValue=""
              >
                <option disabled value="">Choose the game you wanna play</option>
                {
                  games?.map(game => {
                    return <option key={game.id} value={game.id}>{game.title}</option>
                  })
                }
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Your name (or nickname)</label>
              <Input id="name" placeholder="How people call you within the game?"/>
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="yearsPlaying">Playing for how long?</label>
                <Input id="yearsPlaying" type="number" placeholder="Years"/>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="discord">What's your Discord?</label>
                <Input id="discord" placeholder="User#0000" />
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="weekDays">When do you play?</label>

                  <ToggleGroup.Root
                    type='multiple'
                    className='grid grid-cols-4 gap-2'
                    value={selectedWeekDays}
                    onValueChange={setSelectedWeekDays}
                  >
                  {
                    weekDays.map(day => (
                        <ToggleGroup.Item 
                          value={day.value} title={day.name} key={day.value}
                          className={
                            `w-8 h-8 rounded ${selectedWeekDays.includes(day.value) ? 'bg-violet-500' : 'bg-zinc-900'}`
                          }
                        >
                          {day.name.charAt(0)}
                        </ToggleGroup.Item>
                      ))
                    }
                  </ToggleGroup.Root>
              </div>

              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor="hourStart">At what time?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input id="hourStart" type="time" placeholder="From"/>
                  <Input id="hourEnd" type="time" placeholder="Until"/>
                </div>
              </div>
            </div>

            <label className='mt-2 flex gap-2 items-center text-sm'>
              <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900'>
                <Checkbox.Indicator>
                  <Check className='w-4 h-4 text-emerald-400'/>
                </Checkbox.Indicator>
              </Checkbox.Root>
              I'm usually connected to voice channel
            </label>

            <footer className='mt-4 flex justify-end items-center gap-4'>
              <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancel</Dialog.Close>
              <button
                type="submit"
                className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
              >
                  <GameController size={24}/>
                  Find duo
              </button>
            </footer>
          </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}