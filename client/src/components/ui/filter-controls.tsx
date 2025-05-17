import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

interface FilterControlsProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onGroupChange: (value: string) => void;
}

export function FilterControls({
  onSearchChange,
  onCategoryChange,
  onStateChange,
  onPeriodChange,
  onGroupChange
}: FilterControlsProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0 md:mr-4 flex-1">
            <Label htmlFor="search" className="block text-sm font-medium mb-1">Search Elements</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                id="search"
                placeholder="Element name or symbol"
                className="pl-10"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <Label htmlFor="category" className="block text-sm font-medium mb-1">Category</Label>
                <Select onValueChange={onCategoryChange} defaultValue="all">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="metal">Metals</SelectItem>
                    <SelectItem value="nonmetal">Nonmetals</SelectItem>
                    <SelectItem value="metalloid">Metalloids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="state" className="block text-sm font-medium mb-1">State</Label>
                <Select onValueChange={onStateChange} defaultValue="all">
                  <SelectTrigger id="state">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="liquid">Liquid</SelectItem>
                    <SelectItem value="gas">Gas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="period" className="block text-sm font-medium mb-1">Period</Label>
                <Select onValueChange={onPeriodChange} defaultValue="all">
                  <SelectTrigger id="period">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="1">Period 1</SelectItem>
                    <SelectItem value="2">Period 2</SelectItem>
                    <SelectItem value="3">Period 3</SelectItem>
                    <SelectItem value="4">Period 4</SelectItem>
                    <SelectItem value="5">Period 5</SelectItem>
                    <SelectItem value="6">Period 6</SelectItem>
                    <SelectItem value="7">Period 7</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="group" className="block text-sm font-medium mb-1">Group</Label>
                <Select onValueChange={onGroupChange} defaultValue="all">
                  <SelectTrigger id="group">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="1">Group 1</SelectItem>
                    <SelectItem value="2">Group 2</SelectItem>
                    <SelectItem value="transition">Transition Metals</SelectItem>
                    <SelectItem value="18">Noble Gases</SelectItem>
                    <SelectItem value="17">Halogens</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
