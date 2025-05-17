import { useState, useEffect } from "react";
import { Element, elements } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { TableOfElements } from "@/components/ui/table-of-elements";
import { ElementModal } from "@/components/ui/element-modal";
import { ComparisonPanel } from "@/components/ui/comparison-panel";
import { FilterControls } from "@/components/ui/filter-controls";
import { Legend } from "@/components/ui/legend";
import { ArrowLeftRight, RotateCcw, Atom } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    state: "all",
    period: "all",
    group: "all",
  });

  // Handle element click to open modal
  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setModalOpen(true);
  };

  // Handle adding element to comparison
  const handleAddToComparison = (element: Element) => {
    // If already have 2 elements, replace the first one
    if (selectedElements.length >= 2) {
      setSelectedElements([...selectedElements.slice(1), element]);
    } else {
      setSelectedElements([...selectedElements, element]);
    }
    setComparisonOpen(true);
  };

  // Handle removing element from comparison
  const handleRemoveElement = (index: number) => {
    const newElements = [...selectedElements];
    newElements.splice(index, 1);
    setSelectedElements(newElements);
    
    // Close comparison panel if no elements left
    if (newElements.length === 0) {
      setComparisonOpen(false);
    }
  };

  // Handle resetting filters
  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      state: "all",
      period: "all",
      group: "all",
    });
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Atom className="w-8 h-8 mr-2 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                Interactive Periodic Table
              </h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Explore all 118 chemical elements and their properties in our interactive visualization
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <Button
              className="mr-3 flex items-center"
              variant="default"
              onClick={() => setComparisonOpen(!comparisonOpen)}
            >
              <ArrowLeftRight className="mr-2 h-4 w-4" /> Compare Elements
            </Button>
            <Button
              variant="outline"
              className="flex items-center bg-secondary/50 backdrop-blur-sm"
              onClick={handleResetFilters}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset Filters
            </Button>
          </div>
        </header>

        {/* Filters and Search */}
        <FilterControls
          onSearchChange={(value) => setFilters({ ...filters, search: value })}
          onCategoryChange={(value) => setFilters({ ...filters, category: value })}
          onStateChange={(value) => setFilters({ ...filters, state: value })}
          onPeriodChange={(value) => setFilters({ ...filters, period: value })}
          onGroupChange={(value) => setFilters({ ...filters, group: value })}
        />

        {/* Legend */}
        <Legend />

        {/* Comparison Panel */}
        <ComparisonPanel
          isOpen={comparisonOpen}
          onClose={() => setComparisonOpen(false)}
          selectedElements={selectedElements}
          onRemoveElement={handleRemoveElement}
        />

        {/* Periodic Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TableOfElements
            onElementClick={handleElementClick}
            filters={filters}
          />
        </motion.div>

        {/* Element Detail Modal */}
        <ElementModal
          element={selectedElement}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddToComparison={handleAddToComparison}
        />
      </div>
    </div>
  );
}
