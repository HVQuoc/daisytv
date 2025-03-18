import { motion } from "framer-motion";

interface CircleScoreProps {
  score: number; // Expected range: 0-100
}

const CircleScore: React.FC<CircleScoreProps> = ({ score }) => {
  const radius = 30;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const [integerPart, decimalPart] = score.toFixed(2).split(".");

  return (
    <div className="flex items-center justify-center">
      <svg width="100" height="100" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke="green"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1, ease: "easeInOut" }}
          strokeLinecap="round"
        />
        {/* Score Text */}
        <text x="50" y="55" textAnchor="middle" fill="green">
          <tspan fontSize="16" fontWeight="bold">{integerPart}</tspan>
          <tspan fontSize="10">.{decimalPart}</tspan>
          <tspan fontSize="10" fontWeight="bold">%</tspan>
        </text>
      </svg>
    </div>
  );
};

export default CircleScore;