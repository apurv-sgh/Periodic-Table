import { Card, CardContent } from "@/components/ui/card";
import { CategoryCode } from "./color-code";
import { categoryColors, categoryNames, ElementCategory } from "@/lib/data";

export function Legend() {
  const categories = Object.keys(categoryColors) as ElementCategory[];
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-3">Element Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((category) => (
            <CategoryCode 
              key={category}
              color={categoryColors[category]}
              name={categoryNames[category]}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
