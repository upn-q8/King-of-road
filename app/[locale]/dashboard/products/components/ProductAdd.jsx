



import Modal from "../../../components/ui/Modal";
import Title from "../../../components/ui/Title";
import Input from "../../../components/ui/Input";
import { Upload } from "lucide-react";
import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
import AddProduct2 from "./ProductAdd2";
import { useState, useRef, useEffect } from "react";

function ProductAdd({ open, close }) {
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState([{ title: "", description: "" }]);
  const [step, setStep] = useState(1);
  const t = useTranslations("");
  const scrollRef = useRef(null);

  const Inputs = [
    { title: t("name-ar"), name: "Name_Ar" },
    { title: t("name-en"), name: "Name_En" },
    { title: t("stock"), name: "Stock", type: "number" },
    { title: t("product-code"), name: "Product_Code" }
  ];

  const Textareas = [
    { title: t("description-ar"), name: "Description_Ar" },
    { title: t("description-en"), name: "Description_En" },
  ];

  const handleUpload = (event) => {
    const files = event.target.files;
    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }

    setImages(newImages);
  };

  const handleDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
   const addFeature = () => {
     setFeatures([...features, { title: "", description: "" }]);
   };

   const removeFeature = (index) => {
     setFeatures(features.filter((_, i) => i !== index));
   };
  
  return (
    <Modal open={open} close={close} className="md:max-w-5xl bg-[#F5F5F5] p-6 rounded-lg">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-xl font-semibold text-[#2a2a2a]">Add product</h2>
        <button onClick={close} className="text-gray-600 text-lg font-bold">×</button>
      </div>
      <div className="w-full h-[1px] mt-1 bg-gradient-to-r from-orange-500 via-orange-300 to-orange-100 opacity-70"></div>
      {step === 1 ? (
        <>
           <div className="flex items-center space-x-6 py-4 justify-center">
         <div className="flex items-center gap-2 text-orange-500 text-lg font-normal">
           <span className="w-8 h-8 flex items-center justify-center border-2 border-orange-500 rounded-full"><img src="/dashboard/icon/info-circle.svg" /></span>
           Basic Information
         </div>
         <div className="w-16 h-0.5 bg-gray-300"></div>
         <div className="flex items-center gap-2 text-gray-400 text-lg font-normal">
           <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full"><img src="/dashboard/icon/boxgray.svg" /></span>
           Inventory Management
         </div>
       </div>

          <div className="flex gap-4 mt-5 items-center relative">
            <label className="w-72 h-40 border-2 border-gray-300 bg-white flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <input type="file" multiple className="hidden" onChange={handleUpload} />
              <img src="/dashboard/icon/file.png" className="w-8 h-8 text-gray-400" />
              <span className="text-gray-500 text-sm mt-1">Upload Image</span>
            </label>
            <div className="flex items-center gap-3 overflow-hidden relative">
              {images.map((img, index) => (
                <div key={index} className="relative w-36 h-40 rounded-lg overflow-hidden shadow-md border">
                  <img src={img} alt={`Uploaded ${index}`} className="w-52 h-40 object-cover" />
                  <button onClick={() => handleDelete(index)} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                    <img src="/delete.png" alt="delete" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {images.length > 3 && (
              <button className="absolute right-[2px] top-1/2 transform -translate-y-1/2 p-2 ">
                <img src="/dashboard/icon/arrow-circle-right.svg" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-5">
            {Inputs.map((item, i) => (
              <Input
                key={i}
                placeholder={item?.title}
                title={item?.title}
                value={data[item?.name] || ""}
                onChange={(e) => setData({ ...data, [item?.name]: e.target.value })}
                type={item?.type || "text"}
                classNameInput="w-full p-3 border rounded-md mt-1 bg-white w-[18rem]"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 mt-5">
            {Textareas.map((item, i) => (
              <div key={i}>
                <p className="text-lg font-normal text-[#2A2A2A]">{item?.title}</p>
                <textarea
                  placeholder={item?.title}
                  value={data[item?.name] || ""}
                  onChange={(e) => setData({ ...data, [item?.name]: e.target.value })}
                  className="w-full p-3 border rounded-md mt-1"
                />
              </div>
            ))}
          </div>


              {/* Product Features Section */}
       <div className="mt-6">
         <h2 className="text-lg font-normal mb-3 text-[#2A2A2A]">Product Features</h2>
         <button onClick={addFeature} className="flex items-center w-72 gap-2 px-4 py-2 bg-white border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition">
          <img src="/add-circle.svg" /> Add Feature
         </button>
         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
           {features.map((feature, index) => (
             <div key={index} className="border p-4 rounded-lg shadow-sm bg-white relative">
               <input 
                 type="text" 
                 placeholder="Feature title" 
                 className="w-full p-2  rounded-md text-[#2A2A2A]"
                 value={feature.title}
                 onChange={(e) => {
                   const newFeatures = [...features];
                   newFeatures[index].title = e.target.value;
                   setFeatures(newFeatures);
                 }}
               />
               <textarea
                 placeholder="Feature description"
                 className="w-full p-2  rounded-md mt-2 text-[#2A2A2A]"
                 value={feature.description}
                 onChange={(e) => {
                   const newFeatures = [...features];
                   newFeatures[index].description = e.target.value;
                   setFeatures(newFeatures);
                 }}
               ></textarea>
               <button
                onClick={() => removeFeature(index)}
                 className="absolute top-2 right-2 bg-white p-1"
               >
                 <img src="/delete.png" alt="delete" className="w-6 h-6" />
               </button>
               <button
                 onClick={() => handleDelete(index)}
                 className="absolute top-2 right-11 bg-white  p-1 "
               >
                 <img src="/dashboard/icon/edit.svg" alt="edit" className="w-6 h-6" />
               </button>
             </div>
           ))}
         </div>
       </div>

          <div className="flex justify-center mt-6">
            <Button className="btn bg-main-green text-white rounded-md py-2 w-[50%]" type="submit" onClick={() => setStep(2)}>
              {t("Next")}
            </Button>
          </div>
        </>
      ) : (
        <AddProduct2 onPrevious={() => setStep(2)} />
      )}
    </Modal>
  );
}

export default ProductAdd;
