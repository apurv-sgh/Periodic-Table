interface CategoryCodeProps {
  color: string;
  name: string;
}

export function CategoryCode({ color, name }: CategoryCodeProps) {
  return (
    <div className="flex items-center">
      <div className="w-5 h-5 rounded mr-2" style={{ backgroundColor: color }}></div>
      <span className="text-sm">{name}</span>
    </div>
  );
}
