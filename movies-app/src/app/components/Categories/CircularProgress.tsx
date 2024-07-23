import React from 'react';

type CircularProgressProps = {
  percentage: number;
};

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const radius = 13;
  const stroke = 1;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (percent: number) => {
    if (percent <= 40) return '#ff0000';
    if (percent > 40 && percent <= 80) return '#ffa500';
    return '#008000';
  };

  const strokeColor = getColor(percentage);

  const backgroundColor = `${strokeColor}33`;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke={backgroundColor}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{
          strokeDashoffset,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
          transition: 'stroke-dashoffset 0.35s',
          transformBox: 'fill-box',
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fill="white"
        fontSize="9px"
        fontWeight="100"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default CircularProgress;
