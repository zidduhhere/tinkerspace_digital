import React from 'react';

export default function CardContent({ card, textRef, containerRef, isOverflowing, purpose, purposeColor }) {
  return (
    <div className="px-4 py-3 flex flex-col justify-center gap-1 w-full flex-1 bg-black font-mono border-t-4 border-inherit">
      <div className="text-xl leading-tight font-black text-white tracking-widest uppercase whitespace-nowrap">
        <div ref={containerRef} className="overflow-hidden relative">
          <div
            ref={textRef}
            className="whitespace-nowrap inline-block"
            style={{
              animation: isOverflowing ? 'nameScroll 10s ease-in-out infinite alternate' : 'none',
              paddingRight: isOverflowing ? '20px' : '0',
            }}
          >
            {card.name}
          </div>
        </div>
      </div>
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis leading-none mt-1">
        {card.workingOn || card.projectName || 'NO_DATA'}
      </div>
    </div>
  );
}