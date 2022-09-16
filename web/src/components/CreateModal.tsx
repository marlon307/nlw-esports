import React, { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Input from './Form/Input';
import { Check, GameController } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import ButtonDay from './ButtonDay';
import axios from 'axios';
// import * as Select from '@radix-ui/react-select';
interface Game {
  id: string;
  title: string;
}

function CreateModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekdays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then((res) => setGames(res.data));
  }, []);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    if (!data.name) {
      return;
    }
    console.log(useVoiceChannel);

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        weekDays: weekDays.map(Number),
        discord: data.discord,
        yearsPlaying: Number(data.yearsPlaying),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChanlel: useVoiceChannel,
      })
      alert('Anúncio criado com sucesso')
    } catch (error) {
      alert('Erro ao criar o anúncio!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
          <Dialog.Title className="text-3xl text-white font-black">Publique um anúncio</Dialog.Title>
          <form className="mt-8 flex flex-col gap-4" onSubmit={ handleCreate }>
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className='font-semibold'>Qual o game?</label>
              <select
                name="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                defaultValue=""
                placeholder="Selecione o game que deseja jogar"
              >
                <option disabled hidden value="">Selecione o game que deseja jogar</option>
                { games.map((game) => <option key={ game.id } value={ game.id }>{ game.title }</option>) }
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input name="name" placeholder="Como te chaman dentro do game?" />
            </div>
            <div className="grid gird-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                <Input name="yearsPlaying" placeholder="Tudo bem ser ZERO" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qaul seu Dricord?</label>
                <Input name="discord" placeholder="Usuario#000" />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="">Quanto costuma jogar</label>
                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  value={ weekDays }
                  onValueChange={ setWeekdays }
                >
                  <ButtonDay array={ weekDays } value="0" text="D" title="Domingo" />
                  <ButtonDay array={ weekDays } value="1" text="S" title="Segunda" />
                  <ButtonDay array={ weekDays } value="2" text="T" title="Terça" />
                  <ButtonDay array={ weekDays } value="3" text="Q" title="Quarta" />
                  <ButtonDay array={ weekDays } value="4" text="Q" title="Quinta" />
                  <ButtonDay array={ weekDays } value="5" text="S" title="Sexta" />
                  <ButtonDay array={ weekDays } value="6" text="S" title="Sábado" />
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input name="hourStart" type="time" placeholder='De' />
                  <Input name="hourEnd" type="time" placeholder='Até' />
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-2 text-sm items-center">
              <Checkbox.Root
                className="w-6 h-6 rounded bg-zinc-900 p-1"
                onCheckedChange={
                  (checked) => checked === true ? setUseVoiceChannel(true) : setUseVoiceChannel(false)
                }
                checked={ useVoiceChannel }
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="cnn">Costumo me conectar ao chat de voz</label>
            </div>
            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
              >
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                <GameController size={ 24 } />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal >
  )
}

export default CreateModal
