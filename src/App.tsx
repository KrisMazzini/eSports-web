import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { Input } from './components/Form/input'
import { GameController } from 'phosphor-react'

import './styles/main.css'
import logoImg from './assets/logo-nlw-esports.svg'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
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
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>Your <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> is here.</h1>
      
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games?.length && games.map(game => {
            return (
              <GameBanner
                key={game.id}
                title={game.title}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
              />
            )
          })
        }
      </div>

      <Dialog.Root>
        <CreateAdBanner />
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
                      <button 
                        title='Sunday'
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        S
                      </button>
                      <button 
                        title='Monday'
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        M
                      </button>
                      <button 
                        title='Tuesday'
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        T
                      </button>
                      <button 
                        title='Wednesday'
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        W
                      </button>
                      <button 
                        title='Thursday'
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        T
                      </button>
                      <button 
                        title='Friday'
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        F
                      </button>
                      <button 
                        title='Saturday'
                        className='w-8 h-8 rounded bg-zinc-900'
                      >
                        S
                      </button>
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
      </Dialog.Root>

    </div>

  )
}

export default App
