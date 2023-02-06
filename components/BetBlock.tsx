const BetBlock = () => {
    return(
      <div className="flex flex-col bg-[#e2e2e2] w-[800px] h-[350px] rounded-[20px]">
        <div className="flex flex-row">
            <p className="text-[16px] pt-[25px] pl-[25px] text-[#6D6D6D] ">Player</p>
        </div>
        <div className="flex flex-row justify-between pl-[25px] w-[800px] rounded-[20px]">
          <div className="flex flex-row">
            <div className="h-[50px] w-[50px] bg-[#FB9B0B] mr-5" />
            <p className="text-[24px] font-semibold">LeBron James</p>
          </div>
        </div>

         <p className="text-[16px] pt-[41px] pl-[25px] text-left text-[#6D6D6D] ">Statistic</p>

         <p className="text-[24px] pt-[0px] pl-[25px] text-left font-semibold">Rebounds</p>
        
        <div className="h-[75px] w-[750px] bg-[#B9B4B4] ml-[25px] mt-[20px]" />
        <div className="flex flex-row pt-[10px] justify-center">
            <div className="w-[125px] h-[30px] bg-[#C6C6C6] rounded-[10px] mr-[25px]">
                <p className="text-[16px] ">Cancel</p>
            </div>
            <div className="w-[125px] h-[30px] bg-[#FB9B0B] rounded-[10px]">
                <p className="text-[16px] ">Save</p>
            </div>
        </div>

      </div>
    );
  };
  
  export default BetBlock;