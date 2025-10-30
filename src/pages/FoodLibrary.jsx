import React from 'react';

const sampleFoods = [
  { id:1, name:'Oatmeal', cals:150 },
  { id:2, name:'Chicken Breast (100g)', cals:165 },
  { id:3, name:'Avocado (100g)', cals:160 },
];

export default function FoodLibrary(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Food Library</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {sampleFoods.map(f=>(
          <div key={f.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <div className="font-medium">{f.name}</div>
            <div className="text-sm text-gray-500">{f.cals} kcal</div>
          </div>
        ))}
      </div>
    </div>
  );
}
