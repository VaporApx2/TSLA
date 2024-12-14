import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MarketCapChart = () => {
  const data = [{
    name: 'Automakers',
    Tesla: 1370,
    Toyota: 230,
    Volkswagen: 120,
    Mercedes: 85,
    BMW: 75,
    Stellantis: 60,
    GM: 50,
    Ford: 50,
    Honda: 50,
    Hyundai: 50
  }];

  // Custom label component for each bar
  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value, name } = props;
    
    // Determine font size based on height
    let fontSize = 12;
    if (height < 40) fontSize = 8;
    else if (height < 60) fontSize = 10;
    
    // For Tesla, format in trillions
    const formattedValue = name === "Tesla" 
      ? "$1.37T"
      : `$${value}B`;
    
    // For smaller sections, use a more compact label format
    const labelText = height < 40 
      ? `${name}\n${formattedValue}`
      : `${name} (${formattedValue})`;

    return (
      <g>
        {height < 40 ? (
          // Two-line label for small sections
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 5}
              fill="white"
              textAnchor="middle"
              dominantBaseline="bottom"
              fontSize={fontSize}
              fontWeight="bold"
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 5}
              fill="white"
              textAnchor="middle"
              dominantBaseline="top"
              fontSize={fontSize}
              fontWeight="bold"
            >
              {formattedValue}
            </text>
          </>
        ) : (
          // Single-line label for larger sections
          <text
            x={x + width / 2}
            y={y + height / 2}
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fontWeight="bold"
          >
            {labelText}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        Automotive Market Capitalization Comparison
      </h2>
      
      <div className="h-[600px] w-full"> {/* Increased height for better visibility */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 120, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              label={{ 
                value: 'Market Cap (Billions USD)', 
                angle: -90, 
                position: 'insideLeft' 
              }}
              tickFormatter={(value) => `$${value}B`}
              domain={[0, 1500]}
            />
            <Tooltip 
              formatter={(value, name) => [
                name === "Tesla" ? `$${(value/1000).toFixed(2)}T` : `$${value}B`, 
                name
              ]}
              labelFormatter={() => ''}
            />
            <Legend 
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ right: -120 }}
            />
            <Bar 
              dataKey="Tesla" 
              fill="#e11d48" 
              label={(props) => renderCustomizedLabel({...props, name: "Tesla"})}
            />
            <Bar 
              dataKey="Toyota" 
              stackId="others" 
              fill="#ea580c"
              label={(props) => renderCustomizedLabel({...props, name: "Toyota"})}
            />
            <Bar 
              dataKey="Volkswagen" 
              stackId="others" 
              fill="#2563eb"
              label={(props) => renderCustomizedLabel({...props, name: "VW"})}
            />
            <Bar 
              dataKey="Mercedes" 
              stackId="others" 
              fill="#0891b2"
              label={(props) => renderCustomizedLabel({...props, name: "Mercedes"})}
            />
            <Bar 
              dataKey="BMW" 
              stackId="others" 
              fill="#0d9488"
              label={(props) => renderCustomizedLabel({...props, name: "BMW"})}
            />
            <Bar 
              dataKey="Stellantis" 
              stackId="others" 
              fill="#4d7c0f"
              label={(props) => renderCustomizedLabel({...props, name: "Stellantis"})}
            />
            <Bar 
              dataKey="GM" 
              stackId="others" 
              fill="#854d0e"
              label={(props) => renderCustomizedLabel({...props, name: "GM"})}
            />
            <Bar 
              dataKey="Ford" 
              stackId="others" 
              fill="#9333ea"
              label={(props) => renderCustomizedLabel({...props, name: "Ford"})}
            />
            <Bar 
              dataKey="Honda" 
              stackId="others" 
              fill="#be123c"
              label={(props) => renderCustomizedLabel({...props, name: "Honda"})}
            />
            <Bar 
              dataKey="Hyundai" 
              stackId="others" 
              fill="#0369a1"
              label={(props) => renderCustomizedLabel({...props, name: "Hyundai"})}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-sm text-gray-500 text-center mt-4">
        Note: Data is approximate as of early 2024. Values are subject to market fluctuations.
      </p>
    </div>
  );
};

export default MarketCapChart;
