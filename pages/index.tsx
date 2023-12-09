import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Option } from 'react-tailwindcss-select/dist/components/type'
import AddLeg from '../components/AddLeg'
import LegBlock from '../components/LegBlock'
import Dropdown from '../components/Dropdown'
import { playerSearchOptions } from '../utils/globals'

const Home: NextPage = () => {
  const [legs, setLegs] = useState<{ id: string, element: JSX.Element}[]>([]);
  const [searchQuery, setSearchQuery] = useState<Option | Option[] | null | undefined>(null);
  const [allOdds, setAllOdds] = useState<{ id: string, odds: number}[]>([]);
  const [totalOdds, setTotalOdds] = useState<number>(0);
  const [toDelete, setToDelete] = useState('');

  const deleteRow = (id: string) => {
    console.log('deleteRow', id)
    console.log('legs', legs)
    const newLegs = legs.filter((leg) => {
      return leg.id !== id;
    });
    setLegs(newLegs);

    setAllOdds(allOdds.filter((odd) => {
      return odd.id !== id;
    }));
  }

  useEffect(() => deleteRow(toDelete), [toDelete])

  const addToTotal = (id: string, odds: number) => {
    const newOdds = allOdds.filter((odd) => {
      return odd.id !== id;
    });
    setAllOdds([...newOdds, { id, odds }]);
  }

  useEffect(() => {
    if (allOdds.length === 0) return;

    let total = 1;
    allOdds.forEach((odd) => {
      total *= odd.odds / 100;
    });
    setTotalOdds(Math.round(total * 100));
  }, [allOdds])

  useEffect(() => {
    if (!searchQuery) return;
    const query = searchQuery as Option;

    const newId = Math.random().toString();
    setLegs([...legs, { id: newId, element: <LegBlock id={newId} playerId={query.value} key={newId} deleteRow={(id: string) => setToDelete(id)} addToTotal={addToTotal} />}])
  }, [searchQuery])

  useEffect(() => console.log('legs', legs), [legs])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Dropdown
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchable={true}
          options={playerSearchOptions}
        />
        <div className="flex flex-col gap-2 my-4">
          {legs.map((leg) => {
            return leg.element;
            })}
        </div>
        <div className="flex flex-row justify-between w-[800px] h-[60px] gap-4 items-center">
          <div className="flex flex-row p-5 justify-between items-center bg-[#e2e2e2] w-full h-full rounded-lg">
              <p className="text-lg font-semibold">Total</p>
          </div>
          <div className="flex flex-row justify-center items-center min-w-[60px] h-full bg-[#e2e2e2] rounded-lg">
            <p className="text-lg font-semibold">{totalOdds}%</p>
          </div>
          <div className="flex flex-row justify-center items-center min-w-[60px] h-full bg-[#e2e2e2] rounded-lg">
            <p className="text-lg font-semibold">{Math.round(100/totalOdds * 100) / 100}</p>
          </div>
        </div>
        
      </main>
    </div>
  )
}

export default Home
