import React, { useState } from 'react';

export default function CardImage({ src, alt, purpose, purposeColor }) {
  const [imageError, setImageError] = useState(false);
  const firstLetter = alt ? alt.charAt(0).toUpperCase() : '?';

  return (
    <div className="w-full h-[180px] overflow-hidden relative border-b-4 border-inherit bg-black">
      {(!src || imageError) ? (
        <div className="w-full h-full flex items-center justify-center bg-black text-white">
          <span className="text-6xl font-black font-vt323">{firstLetter}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover grayscale contrast-150 transition-all duration-300 opacity-80"
        />
      )}
      {purpose && (
        <div className="absolute bottom-0 left-0 w-full z-10 border-t-4 border-inherit">
          <div 
            className="w-full px-2 py-1 text-[11px] font-black uppercase tracking-widest text-black text-center truncate font-mono"
            style={{ backgroundColor: purposeColor }}
          >
            {purpose}
          </div>
        </div>
      )}
    </div>
  );
}