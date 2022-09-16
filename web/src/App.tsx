
import { useState, useEffect } from 'react';
import logoImg from './assets/Logo.svg';
import CreateAdBanner from './components/CreateAdBanner';
import GameBanner from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';
import './styles/main.css';
import { GameController } from 'phosphor-react';
import Input from './components/Form/Input';
import CreateModal from './components/CreateModal';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then((res) => setGames(res.data))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={ logoImg } alt="eSports" />
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>
      <div className='grid grid-cols-6 gap-6 m-16'>
        { games.map(({ id, title, bannerUrl, _count }) =>
          <GameBanner
            key={ id }
            url={ '' }
            bannerUrl={ bannerUrl }
            title={ title }
            adsCount={ _count.ads }
          />)
        }
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateModal />
      </Dialog.Root>
    </div>
  )
}

export default App
