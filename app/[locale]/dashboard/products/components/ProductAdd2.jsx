

 import React, { useState } from "react"; 
 import Title from "../../../components/ui/Title";
 import Input from "../../../components/ui/Input";
 import { Button } from "@headlessui/react";
 import { useTranslations } from "next-intl";
 import TableProduct2 from "./TableProduct2";
 import AddProduct3 from "./ProductAdd3";
 import AddProduct1 from "./ProductAdd";

function ProductAdd2({ open, close }) {
  const [rows, setRows] = useState([]);
  const [step, setStep] = useState(2);
  const t = useTranslations("");
  const [data, setData] = useState({});
    
  const [newRow, setNewRow] = useState({ colors: [], size: "", weight: "", quantity: "50" });

  const handleAddRow = () => {
    if (!newRow.colors.length || !newRow.size || !newRow.weight) {
      alert("Please fill in all fields before adding.");
      return;
    }

    setRows([...rows, newRow]);
    setNewRow({ colors: [], size: "", weight: "", quantity: "50" });
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    if (!newRow.colors.includes(newColor)) {
      setNewRow({ ...newRow, colors: [...newRow.colors, newColor] });
    }
  };

  const handleDeleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };
   const [selectedOptions, setSelectedOptions] = useState({
     multipleSizes: true,
     multipleColors: true,
     oneSizeAndColor: true,
   });

   const handleToggle = (option) => {
     setSelectedOptions((prev) => {
       const newState = { multipleSizes: false, multipleColors: false, oneSizeAndColor: false };

       if (option !== "oneSizeAndColor") {
         newState[option] = !prev[option];
       } else {
         newState.oneSizeAndColor = !prev.oneSizeAndColor;
       }
       return newState;
     });
   };
  return (
    <div className="md:max-w-5xl">
             <div className="flex items-center justify-center space-x-6 py-4">
         <div className="flex items-center gap-2 text-orange-500 font-semibold">
           <span className="w-8 h-8 flex items-center justify-center border-2 border-orange-500 rounded-full bg-orange-500 text-white">
             ✓
          </span>
           Basic Information
         </div>
         <div className="w-16 h-0.5 bg-orange-500"></div>
         <div className="flex items-center gap-2 text-gray-400 font-semibold">
           <span className="w-8 h-8 flex items-center justify-center border-2 border-orange-500 rounded-full">
           <img src="/dashboard/icon/boxorange.png" />
          </span>
          Inventory Management
        </div>
       </div>
      <p className="text-lg font-semibold text-gray-700 mb-2">
        Are there multiple colors and sizes of the product?
      </p>
      <div className="flex items-center gap-6 mt-4">
         <label className={`flex items-center gap-2 cursor-pointer ${selectedOptions.multipleSizes ? "text-orange-500" : "text-gray-600"}`}>
           <input
            type="checkbox"
             checked={selectedOptions.multipleSizes}
             onChange={() => handleToggle("multipleSizes")}
             className="hidden"
          />
          <span className={`w-5 h-5 flex items-center justify-center border-2 rounded-md ${selectedOptions.multipleSizes ? "bg-orange-500 border-orange-500 text-white" : "border-gray-400"}`}>
             {selectedOptions.multipleSizes && "✓"}
           </span>
           There are multiple sizes
         </label>

         <label className={`flex items-center gap-2 cursor-pointer ${selectedOptions.multipleColors ? "text-orange-500" : "text-gray-600"}`}>
           <input
             type="checkbox"
             checked={selectedOptions.multipleColors}
            onChange={() => handleToggle("multipleColors")}
             className="hidden"
         />
           <span className={`w-5 h-5 flex items-center justify-center border-2 rounded-md ${selectedOptions.multipleColors ? "bg-orange-500 border-orange-500 text-white" : "border-gray-400"}`}>
             {selectedOptions.multipleColors && "✓"}
           </span>
          There are multiple colors
        </label>

         <label className={`flex items-center gap-2 cursor-pointer ${selectedOptions.oneSizeAndColor ? "text-orange-500" : "text-gray-600"}`}>
           <input
             type="checkbox"
            checked={selectedOptions.oneSizeAndColor}
             onChange={() => handleToggle("oneSizeAndColor")}
             className="hidden"
           />
           <span className={`w-5 h-5 flex items-center justify-center border-2 rounded-md ${selectedOptions.oneSizeAndColor ? "bg-orange-500 border-orange-500 text-white" : "border-gray-400"}`}>
            {selectedOptions.oneSizeAndColor && "✓"}
          </span>
          There is one size and color
        </label>
      </div>
      {step === 2 ? (
        <>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
          
            <div className="flex items-center gap-3">
            <input
                type="color"
                className="w-10 h-10 border rounded-md cursor-pointer"
                onChange={handleColorChange}
              />
              <div className="flex gap-2">
                {newRow.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></div>
                   
                  </div>
                ))}
              </div>
            </div>

            <Input 
              placeholder="Size" 
              classNameInput="w-full p-3 border rounded-md" 
              value={newRow.size}
              onChange={(e) => setNewRow({ ...newRow, size: e.target.value })}
            />
            <Input 
              placeholder="Weight" 
              classNameInput="w-full p-3 border rounded-md" 
              value={newRow.weight}
              onChange={(e) => setNewRow({ ...newRow, weight: e.target.value })}
            />
          </div>

       
          <div className="flex justify-center my-6">
            <Button className="btn bg-[#FE5F0D] text-white rounded-md py-2 w-[30%]" type="button" onClick={handleAddRow}>
              {t("Add")}
            </Button>
          </div>

    
          <TableProduct2
            headers={["Colors", "Size", "Weight", "Available Quantity", "Actions"]}
            rows={rows.map((row, index) => ({
              ...row,
              colors: (
                <div className="flex gap-2">
                  {row.colors.map((color, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></div>
                  
                    </div>
                  ))}
                </div>
              ),
              actions: (
                <button className="text-red-500" onClick={() => handleDeleteRow(index)}>
                  Delete
                </button>
              )
            }))}
          />

       
          <div className="flex justify-center mt-6">
            <Button className="bg-gray-400 text-white px-6 py-2 rounded-md w-[20%]" onClick={() => setStep(1)}>
              Previous
            </Button>
            <Button className="bg-[#FE5F0D] text-white px-6 py-2 rounded-md ml-9 w-[30%]" onClick={() => setStep(3)}>
              Add
            </Button>
          </div>
        </>
      ) : (
        <AddProduct3 onPrevious={() => setStep(2)} />
      )}
    </div>
  );
}

export default ProductAdd2;