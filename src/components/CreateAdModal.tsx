import { useEffect, useState } from 'react'
import axios from 'axios'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'

import { Input } from './Form/Input'
import { WeekDay } from './Form/WeekDay'

import { Check, GameController } from 'phosphor-react'

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
    const weekDays = [
        "sunday", "monday", "tuesday",
        "wednesday", "thursday", "friday", "saturday"
    ]

    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
      async function handleGames() {
        const gamesResponse = await axios.get('http://localhost:8080/games');
        const data = gamesResponse.data as Game[];
        setGames(data?.slice(0,6))
      }

      handleGames()
    }, [])

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
                  >
                    <option disabled selected value="">Choose the game you wanna play</option>
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

                    <div className='grid grid-cols-4 gap-2'>
                      {
                        weekDays.map(day => (
                            <WeekDay name={day} key={day} />
                        ))
                      }
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor="hourStart">At what time?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input id="hourStart" type="time" placeholder="From"/>
                      <Input id="hourEnd" type="time" placeholder="Until"/>
                    </div>
                  </div>
                </div>

                <div className='mt-2 flex gap-2 items-center text-sm'>
                  <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900'>
                    <Checkbox.Indicator>
                      <Check className='w-4 h-4 text-emerald-400'/>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  I'm usually connected to voice channel
                </div>

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