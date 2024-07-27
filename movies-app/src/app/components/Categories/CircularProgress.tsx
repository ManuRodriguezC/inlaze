import React from 'react';

type CircularProgressProps = {
  percentage: number;
  radius?: number;
  stroke?: number;
  fontSize?: number
  width?: string
};

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, radius = 13, stroke = 1, fontSize = 8, width = "100" }) => {
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

  const size = `${fontSize}px`

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
        fontSize={size}
        fontWeight={width}
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default CircularProgress;
