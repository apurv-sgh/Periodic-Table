import { motion } from "framer-motion";
import { Element, categoryColors } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ElementCardProps {
  element: Element;
  onClick: (element: Element) => void;
  gridPosition?: { column: number; row: number };
  className?: string;
  opacity?: number;
}

export function ElementCard({ 
  element, 
  onClick, 
  gridPosition, 
  className = "", 
  opacity = 1 
}: ElementCardProps) {
  const { id, symbol, name, atomic_mass, category } = element;
  
  const cardStyle: React.CSSProperties = {
    backgroundColor: categoryColors[category],
    opacity: opacity,
    gridColumn: gridPosition?.column,
    gridRow: gridPosition?.row,
    color: 'white',
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <motion.div
            className={`element-card flex flex-col justify-between p-2 rounded-md shadow-sm cursor-pointer ${className}`}
            style={cardStyle}
            onClick={() => onClick(element)}
            whileHover={{ 
              scale: 1.1, 
              zIndex: 10,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
            }}
            transition={{ duration: 0.2 }}
            data-element={id}
            data-category={category}
            data-state={element.state}
            data-period={element.period}
            data-group={element.group}
          >
            <div className="text-xs font-medium">{id}</div>
            <div className="text-center">
              <div className="text-2xl font-bold">{symbol}</div>
              <div className="text-xs truncate font-medium">{name}</div>
            </div>
            <div className="text-xs text-right opacity-80">{atomic_mass.toFixed(3)}</div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="backdrop-blur-lg bg-black/70 border-slate-700">
          <div className="text-sm font-medium text-white">{name}</div>
          <div className="text-xs text-slate-300">{element.state.charAt(0).toUpperCase() + element.state.slice(1)}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
