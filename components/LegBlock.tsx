'use client';
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const players = require('../data/ActivePlayers.json');
const playerGameStats = require('../data/PlayerToGames.json');

interface Props {
  id: string
  playerId: string
  deleteRow: (index: number) => void
  updateRow: (index: number, playerId: string, odds: number) => void
}

const LegBlock = ({ id, playerId, deleteRow, updateRow }: Props) => {
  const [formData, setFormData] = useState<{
    numGames: number | undefined,
    stat: string | undefined,
    min: number | undefined
  }>({
    numGames: undefined,
    stat: undefined,
    min: undefined
  });
  const [odds, setOdds] = useState<number>(0);

  const player = players[playerId]
  const games = playerGameStats[playerId]

  useEffect(() => {
    console.log('data', formData)
    if (!formData.numGames || !formData.stat || !formData.min) return;

    let total = 0;
    let count = 0;
    for (let i = 0; i < formData.numGames; i++) {
      const game = games[i];
      if (game[formData.stat] >= formData.min) {
        count++;
      }
      total++;
    }

    const odd = (count / total) * 100;
    setOdds(Math.round(odd));
    updateRow(parseInt(id), playerId, Math.round(odd));
  }, [formData])

  return(
    <div className="flex flex-row justify-between w-[800px] h-[60px] gap-4 items-center">
      <div className="flex flex-row p-5 justify-between items-center bg-[#e2e2e2] w-full h-full rounded-lg shadow-sm">
        <div className="flex flex-row items-center">
          <p className="text-lg font-semibold">{player}</p>
        </div>
        
        <div className="flex flex-row gap-2">
          <select 
            className="w-[110px] h-[40px] rounded-lg bg-[#e2e2e2]" 
            placeholder="Num Games"
            defaultValue=""
            onChange={(e) => {
              setFormData({
                ...formData,
                numGames: parseInt(e.target.value)
              })
            }}
          >
            <option value="" disabled>Num Games</option>
            {games.map((_: any, index: number) => {
              return <option value={index + 1} key={index}>{index + 1}</option>
            })}
          </select>
          <select 
            className="w-[100px] h-[40px] rounded-lg bg-[#e2e2e2]" 
            placeholder="Stat"
            defaultValue=""
            onChange={(e) => {
              setFormData({
                ...formData,
                stat: e.target.value
              })
            }}
          >
            <option value="" disabled>Stat</option>
            <option value="PTS">Points</option>
            <option value="AST">Assists</option>
            <option value="REB">Rebounds</option>
            <option value="STL">Steals</option>
            <option value="BLK">Blocks</option>
          </select>
          <input 
            className="w-[100px] h-[40px] rounded-lg bg-[#e2e2e2]" 
            placeholder="Min" 
            type="number"
            onChange={(e) => {
              setFormData({
                ...formData,
                min: parseInt(e.target.value)
              })
            }}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center min-w-[60px] h-full bg-[#e2e2e2] rounded-lg shadow-md">
        <p className="text-lg font-semibold">{odds}%</p>
      </div>
      <Trash2 className="cursor-pointer" onClick={() => deleteRow(parseInt(id))} />
    </div>
  );
};

export default LegBlock;