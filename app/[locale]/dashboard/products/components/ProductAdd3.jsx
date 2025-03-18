import React, { useState } from "react"; 
import Title from "../../../components/ui/Title";
import Input from "../../../components/ui/Input";
import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
import AddProduct2 from "./ProductAdd2"


function ProductAdd3({ open, close }) {
  const [data, setData] = useState({});
  const [rows, setRows] = useState([]);
  const [step, setStep] = useState(3);

  const t = useTranslations("");

  const handleAddRow = () => {
    setRows([...rows, { color: "", size: "", weight: "", quantity: "" }]);
  };

  const handleDeleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const [selectedOptions, setSelectedOptions] = useState({
    multipleSizes: false,
    multipleColors: false,
    oneSizeAndColor: false,
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
     
      

      
      
      {step === 3 ? (
        <>
      <p className="text-lg font-semibold text-gray-700 my-2 mt-2">Available quantity</p>
    
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Input placeholder="Available quantity" classNameInput="w-full p-3 border rounded-md" />
        <Button className="btn bg-main-green text-white rounded-md py-2 w-[30%]" type="submit">
          {t("Add")}
        </Button>
      </div>

    
      

     
      
      </>
            ) : (
              <AddProduct2 onPrevious={() => setStep(2)} />
            )}
    </div>
    
  );
}

export default ProductAdd3;
