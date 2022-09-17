import {MagnifyingGlassPlus} from 'phosphor-react'

export function CreateAdBanner() {
    return (
        <div className='pt-1 mt-8 self-stretch bg-nlw-gradient rounded-lg overflow-hidden'>
        <div className='bg-[#2A2634] px-8 py-6 rounded-t-lg flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-black block'>Didn't find your duo?</strong>
            <span className='text-zinc-400 block'>Publish an ad to find new players!</span>
          </div>

          <button className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus size={24}/>
            Publish ad
          </button>
        </div>
      </div>
    )
}