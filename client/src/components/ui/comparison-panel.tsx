import { useState, useEffect } from "react";
import { Element, categoryColors, categoryNames } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, XCircle, Flame, ThermometerSnowflake, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ComparisonPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedElements: Element[];
  onRemoveElement: (index: number) => void;
}

export function ComparisonPanel({ 
  isOpen, 
  onClose, 
  selectedElements, 
  onRemoveElement 
}: ComparisonPanelProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getPropertyComparison = (property: keyof Element, symbol: string, label: string, icon?: JSX.Element) => {
    const el1 = selectedElements[0];
    const el2 = selectedElements[1];
    
    if (!el1 || !el2) return null;
    
    const val1 = el1[property];
    const val2 = el2[property];

    // Calculate the difference early to use for coloring and formatting
    const diffValue = typeof val1 === 'number' && typeof val2 === 'number' ? val2 - val1 : 0;
    
    let comparison = '';
    if (typeof val1 === 'number' && typeof val2 === 'number') {
      if (diffValue > 0) {
        comparison = `${symbol} ${Math.abs(diffValue).toFixed(2)}`;
      } else if (diffValue < 0) {
        comparison = `${symbol} ${Math.abs(diffValue).toFixed(2)}`;
      } else {
        comparison = 'Equal';
      }
    }
    
    return (
      <div className="bg-slate-900/40 p-2 rounded-md border border-slate-700/50 flex items-center mt-2">
        <div className="w-6">{icon}</div>
        <div className="flex-1">
          <span className="text-xs text-slate-400">{label}</span>
        </div>
        <div className="text-right ml-2">
          <p className={`font-medium text-sm ${diffValue > 0 ? 'text-green-400' : diffValue < 0 ? 'text-red-400' : 'text-blue-400'}`}>
            {comparison}
          </p>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 overflow-hidden"
        >
          <Card className="border-primary/10 shadow-lg shadow-primary/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Element Comparison
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[0, 1].map((index) => {
                  const element = selectedElements[index];
                  return (
                    <motion.div 
                      key={index}
                      className={`bg-slate-900/50 backdrop-blur-md rounded-md p-4 min-h-[200px] border border-slate-700/50 ${!element ? 'flex flex-col items-center justify-center' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {element ? (
                        <>
                          <div className="flex items-center mb-3">
                            <div 
                              className="w-12 h-12 rounded-md flex items-center justify-center text-white mr-3 shadow-lg shadow-black/20"
                              style={{ backgroundColor: categoryColors[element.category] }}
                            >
                              <span className="text-2xl font-bold">{element.symbol}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{element.name}</h4>
                              <p className="text-xs text-primary/80">{categoryNames[element.category]}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-900/60 p-2 rounded-md border border-slate-700/50">
                              <span className="text-xs text-slate-400">Atomic Number</span>
                              <p className="font-medium text-sm text-white">{element.id}</p>
                            </div>
                            <div className="bg-slate-900/60 p-2 rounded-md border border-slate-700/50">
                              <span className="text-xs text-slate-400">Atomic Mass</span>
                              <p className="font-medium text-sm text-white">{element.atomic_mass.toFixed(3)}</p>
                            </div>
                            <div className="bg-slate-900/60 p-2 rounded-md border border-slate-700/50">
                              <span className="text-xs text-slate-400">Electronegativity</span>
                              <p className="font-medium text-sm text-white">
                                {element.electronegativity 
                                  ? element.electronegativity.toFixed(2) 
                                  : 'N/A'}
                              </p>
                            </div>
                            <div className="bg-slate-900/60 p-2 rounded-md border border-slate-700/50">
                              <span className="text-xs text-slate-400">State</span>
                              <p className="font-medium text-sm text-white">
                                {element.state.charAt(0).toUpperCase() + element.state.slice(1)}
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-3 text-slate-300 hover:text-white hover:bg-red-500/10"
                            onClick={() => onRemoveElement(index)}
                          >
                            <XCircle className="mr-1 h-4 w-4" /> Remove
                          </Button>
                        </>
                      ) : (
                        <p className="text-slate-400 italic">Select an element to compare</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {selectedElements.length === 2 && (
                <motion.div 
                  className="mt-4 border border-slate-700/30 rounded-md p-4 bg-slate-800/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-sm font-medium mb-2 text-white">Property Comparison</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {getPropertyComparison('electronegativity', '±', 'Electronegativity Difference', 
                      <Zap className="h-3 w-3 text-yellow-400" />
                    )}
                    {getPropertyComparison('meltingPoint', '±', 'Melting Point Diff. (°C)', 
                      <ThermometerSnowflake className="h-3 w-3 text-blue-400" />
                    )}
                    {getPropertyComparison('boilingPoint', '±', 'Boiling Point Diff. (°C)', 
                      <Flame className="h-3 w-3 text-orange-400" />
                    )}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
