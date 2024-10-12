import { useEffect, useState } from "react";

const CircularGauge = ({ score }: { score: number }) => {
    const totalSegments = 40;
    const [filledSegments, setFilledSegments] = useState(0); // Initialiser les segments à 0 pour l'animation

    useEffect(() => {
        let start = 0;
        const increment = Math.ceil(((score / 100) * totalSegments) / 30); // Diviser l'animation sur 30 étapes
        const interval = setInterval(() => {
            start += increment;
            setFilledSegments(
                Math.min(start, Math.round((score / 100) * totalSegments))
            ); // Remplir progressivement
            if (start >= Math.round((score / 100) * totalSegments)) {
                clearInterval(interval);
            }
        }, 50); // Ajuster la vitesse d'animation ici
        return () => clearInterval(interval);
    }, [score]);

    // Fonction pour interpoler la couleur en fonction du ratio
    interface InterpolateColor {
        (ratio: number): string;
    }

    const interpolateColor: InterpolateColor = (ratio) => {
        if (ratio < 0.33) {
            const interpolateRatio = ratio / 0.33;
            const r = 255;
            const g = Math.round(165 * interpolateRatio);
            const b = 0;
            return `rgb(${r},${g},${b})`;
        } else if (ratio < 0.66) {
            const interpolateRatio = (ratio - 0.33) / 0.33;
            const r = 255;
            const g = 165 + Math.round(90 * interpolateRatio);
            const b = 0;
            return `rgb(${r},${g},${b})`;
        } else {
            const interpolateRatio = (ratio - 0.66) / 0.34;
            const r = Math.round(255 * (1 - interpolateRatio));
            const g = 255;
            const b = 0;
            return `rgb(${r},${g},${b})`;
        }
    };

    const darkenColor = (rgbColor: string): string => {
        const [r, g, b] = rgbColor
            .replace(/[^\d,]/g, "")
            .split(",")
            .map(Number);
        const darkenFactor = 0.85;
        const darkR = Math.round(r * darkenFactor);
        const darkG = Math.round(g * darkenFactor);
        const darkB = Math.round(b * darkenFactor);
        return `rgb(${darkR},${darkG},${darkB})`;
    };

    const segments = Array.from({ length: totalSegments }, (_, index) => {
        const angle = (index / totalSegments) * 270 - 131;
        const rotate = `rotate(${angle}, 100, 100)`;
        const ratio = index / totalSegments;
        const color =
            index < filledSegments ? interpolateColor(ratio) : "#e0e0e0";
        const borderColor =
            index < filledSegments ? darkenColor(color) : "#ccc";

        const segmentHeight =
            index === 0 || index === totalSegments - 1 || index % 5 === 0
                ? 15
                : 10;
        const yPosition =
            index === 0 || index === totalSegments - 1 || index % 5 === 0
                ? "10"
                : "15";

        return (
            <rect
                key={index}
                x="98"
                y={yPosition}
                width="4"
                height={segmentHeight}
                fill={color}
                stroke={borderColor}
                strokeWidth="2"
                transform={rotate}
                rx="0"
                ry="0"
            />
        );
    });
    return (
        <div className="gauge-container">
            <svg className="gauge" viewBox="0 0 200 200">
                {segments}
            </svg>
            <div className="gauge-score">
                <div className="score-text">{score}</div>
                <div className="score-info">
                    <div className="text-center">
                        {score >= 21 && score < 31 && <span>Mediocre</span>}
                        {score >= 31 && score < 41 && <span>Fair Effort</span>}
                        {score >= 41 && score < 51 && <span>Average</span>}
                        {score >= 51 && score < 61 && <span>Satisfactory</span>}
                        {score >= 61 && score < 71 && <span>Good</span>}
                        {score >= 71 && score < 81 && (
                            <span>Very Impressive!</span>
                        )}
                        {score >= 81 && score < 91 && (
                            <span>Outstanding!!</span>
                        )}
                        {score >= 91 && score < 100 && (
                            <span className="text-[#13ff02]">Excellent!!!</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

//     //const [score, setScore] = useState(75);
//     const svgSize = 160;
//     const center = svgSize / 2;

//     const totalBars = 35;
//     const sections = 8;
//     const barsPerSection = Math.floor(totalBars / sections);
//     const regularBarWidth = 2;
//     const sectionBarWidth = 4;
//     const barHeight = 12;
//     const sectionBarHeight = 18;

//     const getColor = (percentage) => {
//         const hue = percentage * 120; // 0 is red, 120 is green
//         return `hsl(${hue}, 100%, 50%)`;
//     };

//     const createBars = () => {
//         const filledBars = Math.floor((score / 100) * totalBars);
//         return Array.from({ length: totalBars }, (_, index) => {
//             const angle = (index / totalBars) * 2 * Math.PI - Math.PI / 2;
//             const isSectionBar = index % barsPerSection === 0;
//             const width = isSectionBar ? sectionBarWidth : regularBarWidth;
//             const height = isSectionBar ? sectionBarHeight : barHeight;
//             const isFilled = index < filledBars;
//             const color = getColor(index / totalBars);

//             if (isFilled) {
//                 return (
//                     <line
//                         key={index}
//                         x1={center + radius * Math.cos(angle)}
//                         y1={center + radius * Math.sin(angle)}
//                         x2={center + (radius + height) * Math.cos(angle)}
//                         y2={center + (radius + height) * Math.sin(angle)}
//                         stroke={color}
//                         strokeWidth={width}
//                         strokeLinecap="round"
//                     />
//                 );
//             }
//             return null;
//         });
//     };

//     return (
//         <div className="flex flex-col items-center justify-center">
//             <div className="relative">
//                 <svg
//                     className="w-[200px]"
//                     viewBox={`0 0 ${svgSize} ${svgSize}`}>
//                     <g id="bars">{createBars()}</g>
//                     <text
//                         x={center}
//                         y={center}
//                         textAnchor="middle"
//                         dominantBaseline="central"
//                         fill="white"
//                         fontSize={radius * 0.6}
//                         fontWeight="600"
//                         fontFamily="Arial, Helvetica, sans-serif">
//                         {score}
//                     </text>
//                     <text
//                         x={center + radius / 3}
//                         y={center + radius / 20}
//                         textAnchor="start"
//                         dominantBaseline="baseline"
//                         fill="white"
//                         fontSize={radius * 0.25}
//                         fontWeight="400"
//                         fontFamily="Arial, Helvetica, sans-serif">
//                         %
//                     </text>
//                 </svg>
{
    /* <div className="text-center text-2xl -mt-6">
    {score >= 21 && score < 31 && (
        <span className="text-[#ff7500]">Mediocre</span>
    )}
    {score >= 31 && score < 41 && (
        <span className="text-[#ffaf01]">Fair Effort</span>
    )}
    {score >= 41 && score < 51 && (
        <span className="text-[#bfb511]">Average</span>
    )}
    {score >= 51 && score < 61 && (
        <span className="text-[#dbff00]">Satisfactory</span>
    )}
    {score >= 61 && score < 71 && <span className="text-[#a0ff00]">Good</span>}
    {score >= 71 && score < 81 && (
        <span className="text-[#88ff00]">Very Impressive!</span>
    )}
    {score >= 81 && score < 91 && (
        <span className="text-[#3eff00]">Outstanding!!</span>
    )}
    {score >= 91 && score < 100 && (
        <span className="text-[#13ff02]">Excellent!!!</span>
    )}
</div>; */
}
//             </div>
//         </div>
//     );
// };

export default CircularGauge;
