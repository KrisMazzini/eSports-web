import * as Dialog from '@radix-ui/react-dialog'

import { Input } from './Form/Input'
import { WeekDay } from './Form/WeekDay'

import { GameController } from 'phosphor-react'

export function CreateAdModal() {
    const weekDays = [
        "sunday", "monday", "tuesday",
        "wednesday", "thursday", "friday", "saturday"
    ]

    return (
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publish an ad</Dialog.Title>
              <form className='mt-8 flex flex-col gap-4'>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Which game?</label>
                  <Input id="game" placeholder="Choose the game you wanna play"/>
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
                  <Input type="checkbox"/>
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