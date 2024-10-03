const CircularGauge = ({
  score,
  radius = 40,
}: {
  score: number;
  radius?: number;
}) => {
  //const [score, setScore] = useState(75);
  const svgSize = 160;
  const center = svgSize / 2;

  const totalBars = 35;
  const sections = 8;
  const barsPerSection = Math.floor(totalBars / sections);
  const regularBarWidth = 2;
  const sectionBarWidth = 4;
  const barHeight = 12;
  const sectionBarHeight = 18;

  const getColor = (percentage) => {
    const hue = percentage * 120; // 0 is red, 120 is green
    return `hsl(${hue}, 100%, 50%)`;
  };

  const createBars = () => {
    const filledBars = Math.floor((score / 100) * totalBars);
    return Array.from({ length: totalBars }, (_, index) => {
      const angle = (index / totalBars) * 2 * Math.PI - Math.PI / 2;
      const isSectionBar = index % barsPerSection === 0;
      const width = isSectionBar ? sectionBarWidth : regularBarWidth;
      const height = isSectionBar ? sectionBarHeight : barHeight;
      const isFilled = index < filledBars;
      const color = getColor(index / totalBars);

      if (isFilled) {
        return (
          <line
            key={index}
            x1={center + radius * Math.cos(angle)}
            y1={center + radius * Math.sin(angle)}
            x2={center + (radius + height) * Math.cos(angle)}
            y2={center + (radius + height) * Math.sin(angle)}
            stroke={color}
            strokeWidth={width}
            strokeLinecap="round"
          />
        );
      }
      return null;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg width="320" height="320" viewBox={`0 0 ${svgSize} ${svgSize}`}>
          <g id="bars">{createBars()}</g>
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize={radius * 0.6}
            fontWeight="600"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            {score}
          </text>
          <text
            x={center + radius / 3}
            y={center + radius / 20}
            textAnchor="start"
            dominantBaseline="baseline"
            fill="white"
            fontSize={radius * 0.25}
            fontWeight="400"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            %
          </text>
        </svg>
      </div>
    </div>
  );
};

export default CircularGauge;
