'use client';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Option } from 'react-tailwindcss-select/dist/components/type'
import AddLeg from '../components/AddLeg'
import LegBlock from '../components/LegBlock'
import Dropdown from '../components/Dropdown'
import { playerSearchOptions } from '../utils/globals'

const Home: NextPage = () => {
  const [allOdds, setAllOdds] = useState<{ playerId: string, odds: number}[]>([]);
  const [totalOdds, setTotalOdds] = useState<number>(0);

  useEffect(() => {
    if (allOdds.length === 0) {
      setTotalOdds(0);
      return;
    };

    let total = 1;
    allOdds.forEach((odd) => {
      total *= odd.odds / 100;
    });
    setTotalOdds(Math.round(total * 100));
  }, [allOdds])

  const setSearchQuery = (query: Option | Option[] | null | undefined) => {
    if (!query) return;
    const queryOption = query as Option;

    setAllOdds([...allOdds, { playerId: queryOption.value, odds: 0 }]);
  }

  const deleteRow = (index: number) => {
    const newOdds = [...allOdds];
    newOdds.splice(index, 1);
    setAllOdds(newOdds);
  }

  const updateRow = (index: number, playerId: string, odds: number) => {
    const newAllOdds = [...allOdds];
    newAllOdds[index] = { playerId, odds };
    setAllOdds(newAllOdds);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Dropdown
          searchQuery={undefined}
          setSearchQuery={setSearchQuery}
          searchable={true}
          options={playerSearchOptions}
        />
        <div className="flex flex-col gap-2 my-4">
          {allOdds.map((odd, index) => {
            return <LegBlock id={index.toString()} playerId={odd.playerId} key={index.toString()} deleteRow={deleteRow} updateRow={updateRow} />
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
