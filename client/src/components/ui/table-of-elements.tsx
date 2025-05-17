import React from "react";
import { ElementCard } from "./element-card";
import { Element, elements, getElementPosition } from "@/lib/data";

interface TableOfElementsProps {
  onElementClick: (element: Element) => void;
  filters: {
    search: string;
    category: string;
    state: string;
    period: string;
    group: string;
  };
}

export function TableOfElements({ onElementClick, filters }: TableOfElementsProps) {
  // Filter elements based on search and filters
  const filteredElements = elements.filter(element => {
    // Search filter
    if (filters.search && !element.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !element.symbol.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category !== 'all') {
      if (filters.category === 'metal' && 
          !['alkali', 'alkaline', 'transition', 'posttransition', 'lanthanide', 'actinide'].includes(element.category)) {
        return false;
      }
      if (filters.category === 'nonmetal' && 
          !['nonmetal', 'halogen', 'noblegas'].includes(element.category)) {
        return false;
      }
      if (filters.category === 'metalloid' && element.category !== 'metalloid') {
        return false;
      }
    }
    
    // State filter
    if (filters.state !== 'all' && element.state !== filters.state) {
      return false;
    }
    
    // Period filter
    if (filters.period !== 'all' && element.period !== parseInt(filters.period)) {
      return false;
    }
    
    // Group filter
    if (filters.group !== 'all') {
      if (filters.group === 'transition' && 
          !(typeof element.group === 'number' && element.group >= 3 && element.group <= 12)) {
        return false;
      } else if (filters.group !== 'transition' && element.group !== parseInt(filters.group)) {
        return false;
      }
    }
    
    return true;
  });

  // Create a map of all elements
  const elementMap = new Map(filteredElements.map(el => [el.id, el]));
  
  // Regular table elements (not lanthanides and actinides)
  const mainTableElements = filteredElements.filter(el => 
    !(el.period === 6 && typeof el.group === 'number' && el.group >= 3 && el.id >= 58 && el.id <= 71) && 
    !(el.period === 7 && typeof el.group === 'number' && el.group >= 3 && el.id >= 90 && el.id <= 103)
  );
  
  // Lanthanides (period 6, group 3)
  const lanthanides = filteredElements.filter(el => 
    el.period === 6 && typeof el.group === 'number' && el.group >= 3 && el.id >= 58 && el.id <= 71
  );
  
  // Actinides (period 7, group 3)
  const actinides = filteredElements.filter(el => 
    el.period === 7 && typeof el.group === 'number' && el.group >= 3 && el.id >= 90 && el.id <= 103
  );

  return (
    <div className="overflow-x-auto mb-6">
      <div className="min-w-[1100px] mb-4">
        {/* Main periodic table */}
        <div className="grid grid-cols-[repeat(18,minmax(60px,1fr))] grid-rows-[repeat(7,minmax(60px,auto))] gap-1">
          {mainTableElements.map(element => {
            const position = getElementPosition(element);
            const opacity = elementMap.has(element.id) ? 1 : 0.3;
            
            return (
              <ElementCard
                key={element.id}
                element={element}
                onClick={onElementClick}
                gridPosition={position}
                opacity={opacity}
              />
            );
          })}
          
          {/* Lanthanide placeholder */}
          <div 
            className="rounded-md p-2 flex items-center justify-center text-white"
            style={{ backgroundColor: '#a855f7', gridColumn: 3, gridRow: 6 }}
          >
            <div className="text-xs text-center">57-71</div>
          </div>
          
          {/* Actinide placeholder */}
          <div 
            className="rounded-md p-2 flex items-center justify-center text-white"
            style={{ backgroundColor: '#d946ef', gridColumn: 3, gridRow: 7 }}
          >
            <div className="text-xs text-center">89-103</div>
          </div>
        </div>
      </div>
      
      {/* Lanthanide series */}
      <div className="grid grid-cols-[repeat(15,minmax(60px,1fr))] gap-1 ml-[60px] mt-4">
        {lanthanides.map(element => {
          const position = getElementPosition(element);
          const opacity = elementMap.has(element.id) ? 1 : 0.3;
          
          return (
            <ElementCard
              key={element.id}
              element={element}
              onClick={onElementClick}
              opacity={opacity}
              gridPosition={{ column: position.column - 3, row: 1 }}
            />
          );
        })}
      </div>
      
      {/* Actinide series */}
      <div className="grid grid-cols-[repeat(15,minmax(60px,1fr))] gap-1 ml-[60px] mt-2">
        {actinides.map(element => {
          const position = getElementPosition(element);
          const opacity = elementMap.has(element.id) ? 1 : 0.3;
          
          return (
            <ElementCard
              key={element.id}
              element={element}
              onClick={onElementClick}
              opacity={opacity}
              gridPosition={{ column: position.column - 3, row: 1 }}
            />
          );
        })}
      </div>
    </div>
  );
}
