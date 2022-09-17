import { useState, useEffect } from 'react'
import axios from 'axios'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

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
      console.log(gamesResponse)
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

      <CreateAdBanner />

    </div>

  )
}

export default App
