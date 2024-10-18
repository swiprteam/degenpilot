import { useEffect, useState } from "react";

const CircularGauge = ({
    score,
    animate,
}: {
    score: number;
    animate: boolean;
}) => {
    const totalSegments = 40;
    const [filledSegments, setFilledSegments] = useState(0); // Initialiser les segments à 0 pour l'animation

    useEffect(() => {
        let start = 0;
        if (!animate) return;
        const increment = Math.ceil(((score / 100) * totalSegments) / 30); // Diviser l'animation sur 30 étapes
        const interval = setInterval(() => {
            start += increment;
            setFilledSegments(
                Math.min(start, Math.round((score / 100) * totalSegments))
            ); // Remplir progressivement
            if (start >= Math.round((score / 100) * totalSegments)) {
                clearInterval(interval);
            }
        }, 25);
        return () => clearInterval(interval);
    }, [score, animate]);

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
            index < filledSegments ? interpolateColor(ratio) : "#656565";
        const borderColor =
            index < filledSegments ? darkenColor(color) : "#4f4f4f";

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

export default CircularGauge;
