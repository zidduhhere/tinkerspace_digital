import React, { useState, useRef, useEffect } from 'react';
import { USER_BADGES } from '../../utils/constants/badgeConfig';
import UserImage from '../userdetails/UserImage';
import UserBadges from '../userdetails/UserBadges';
import UserInfo from '../userdetails/UserInfo';

// Color mapping for different user purposes with neon colors
const PURPOSE_COLORS = {
  'Attending an event': '#FF00FF', // Hot Magenta
  'On duty': '#00FFFF', // Electric Blue
  'Visiting': '#00FF41', // Matrix Green
  'Working on a project': '#FFFF00', // Cyber Yellow
  'Self Learning': '#FF00FF', 
  'default': '#00FF41' 
};

export default function UserCard({ card, CARD_HEIGHT }) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const userBadges = USER_BADGES[card.name] || [];
  const hasSecurityBadge = userBadges.includes('guard');
  const displayPurpose = hasSecurityBadge ? 'On duty' : card.purpose;
  const purposeColor = PURPOSE_COLORS[displayPurpose] || PURPOSE_COLORS['default'];

  // Determine brutal shadow based on purpose color
  let shadowClass = 'shadow-brutal-green';
  let borderClass = 'border-neon-green';
  if (purposeColor === '#FF00FF') { shadowClass = 'shadow-brutal-magenta'; borderClass = 'border-neon-magenta'; }
  else if (purposeColor === '#FFFF00') { shadowClass = 'shadow-brutal-yellow'; borderClass = 'border-neon-yellow'; }
  else if (purposeColor === '#00FFFF') { shadowClass = 'shadow-brutal'; borderClass = 'border-neon-blue'; } // using default white brutal shadow for blue or we can just leave it

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      setIsOverflowing(textWidth - containerWidth > 1);
    }
  }, [card.name]);

  return (
    <div 
      className={`bg-black border-4 ${borderClass} ${shadowClass} flex flex-col items-center transition-all duration-300 relative`}
      style={{
        width: '100%',
        height: `${CARD_HEIGHT}px`
      }}
    >
      <UserImage 
        src={card.avatar} 
        alt={card.name} 
        purpose={displayPurpose}
        purposeColor={purposeColor}
      />
      <UserBadges name={card.name} />
      <UserInfo 
        card={card} 
        textRef={textRef} 
        containerRef={containerRef} 
        isOverflowing={isOverflowing}
      />
    </div>
  );
}