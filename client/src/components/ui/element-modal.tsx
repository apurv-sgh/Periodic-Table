import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Element, categoryColors, categoryNames } from "@/lib/data";
import { X, PlusCircle, ThermometerSnowflake, Flame, Droplets, Weight, Atom, Layers, AreaChart } from "lucide-react";

interface ElementModalProps {
  element: Element | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToComparison: (element: Element) => void;
}

export function ElementModal({ element, isOpen, onClose, onAddToComparison }: ElementModalProps) {
  if (!element) return null;

  const handleAddToComparison = () => {
    onAddToComparison(element);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-black/40 border-slate-700">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div 
                className="w-16 h-16 rounded-md flex items-center justify-center text-white mr-4 shadow-lg shadow-black/20"
                style={{ backgroundColor: categoryColors[element.category] }}
              >
                <span className="text-4xl font-bold">{element.symbol}</span>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">{element.name}</DialogTitle>
                <p className="text-primary/90 font-medium">{categoryNames[element.category]}</p>
              </div>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center text-slate-200">
              <Layers className="w-4 h-4 mr-1 text-primary/80" /> Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-900/50 p-3 rounded-md border border-slate-700/50">
                <span className="text-xs text-slate-400">Atomic Number</span>
                <p className="font-medium text-white">{element.id}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-md border border-slate-700/50">
                <span className="text-xs text-slate-400">Atomic Mass</span>
                <p className="font-medium text-white">{element.atomic_mass.toFixed(4)} u</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-md border border-slate-700/50">
                <span className="text-xs text-slate-400">Period</span>
                <p className="font-medium text-white">{element.period}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-md border border-slate-700/50">
                <span className="text-xs text-slate-400">Group</span>
                <p className="font-medium text-white">{element.group}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-md border border-slate-700/50">
                <span className="text-xs text-slate-400">Phase at STP</span>
                <p className="font-medium text-white flex items-center">
                  {element.state === 'solid' && <Layers className="w-3 h-3 mr-1 text-blue-400" />}
                  {element.state === 'liquid' && <Droplets className="w-3 h-3 mr-1 text-blue-400" />}
                  {element.state === 'gas' && <Flame className="w-3 h-3 mr-1 text-orange-400" />}
                  {element.state.charAt(0).toUpperCase() + element.state.slice(1)}
                </p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-md border border-slate-700/50">
                <span className="text-xs text-slate-400">Density</span>
                <p className="font-medium text-white flex items-center">
                  <Weight className="w-3 h-3 mr-1 text-green-400" />
                  {element.density 
                    ? element.density < 0.01 
                      ? `${element.density.toExponential(4)} g/cm³` 
                      : `${element.density.toFixed(4)} g/cm³`
                    : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center text-slate-200">
              <Atom className="w-4 h-4 mr-1 text-primary/80" /> Atomic Properties
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-slate-900/50 p-3 rounded-md border border-slate-700/50">
                <span className="text-xs text-slate-400">Electron Configuration</span>
                <p className="font-medium text-white">{element.electronConfig}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-md border border-slate-700/50">
                <span className="text-xs text-slate-400">Electronegativity</span>
                <p className="font-medium text-white">
                  {element.electronegativity 
                    ? `${element.electronegativity.toFixed(2)} (Pauling scale)` 
                    : 'Not applicable'}
                </p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-md border border-slate-700/50">
                <span className="text-xs text-slate-400">Ionization Energy</span>
                <p className="font-medium text-white">
                  {element.ionizationEnergy 
                    ? `${element.ionizationEnergy} kJ/mol` 
                    : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-900/50 p-4 rounded-md border border-slate-700/50">
            <h4 className="text-sm font-medium mb-1 flex items-center text-slate-300">
              <ThermometerSnowflake className="w-3 h-3 mr-1 text-blue-400" /> Melting Point
            </h4>
            <p className="text-lg font-semibold text-white">
              {element.meltingPoint !== undefined 
                ? `${element.meltingPoint}°C` 
                : 'Unknown'}
            </p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-md border border-slate-700/50">
            <h4 className="text-sm font-medium mb-1 flex items-center text-slate-300">
              <Flame className="w-3 h-3 mr-1 text-orange-400" /> Boiling Point
            </h4>
            <p className="text-lg font-semibold text-white">
              {element.boilingPoint !== undefined 
                ? `${element.boilingPoint}°C` 
                : 'Unknown'}
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3 flex items-center text-slate-200">
            <AreaChart className="w-4 h-4 mr-1 text-primary/80" /> Description
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {element.description}
          </p>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleAddToComparison} 
            className="bg-primary hover:bg-primary/80"
            variant="default"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add to Comparison
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
