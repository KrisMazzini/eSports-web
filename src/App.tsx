import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import './styles/main.css'
import logoImg from './assets/logo-nlw-esports.svg'

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>Your <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> is here.</h1>
      
      <div className='grid grid-cols-6 gap-6 mt-16'>
        
      </div>

      <CreateAdBanner />

    </div>

  )
}

export default App
