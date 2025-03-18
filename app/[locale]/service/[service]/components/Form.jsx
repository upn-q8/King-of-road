import React from "react";
import Input from "../../../components/ui/Input";

function Form() {
  const inputs = [
    { title: "Full Name", name: "full_name" },
    { title: "E-Mail", name: "email", type: "email" },
    { title: "Phone Number", name: "phone", type: "number" },
    { title: "Subject", name: "subject" },
    { title: "Car type", name: "car_type" },
    { title: "Parts to be installed or maintained", name: "maintained" },
  ];

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-xl md:text-2xl">Book your appointment now</h1>
      <img src="/icon/line.png" className="md:w-1/4 mt-5" alt="" />
      <div className="flex items-start mt-5 gap-6 justify-between max-md:flex-wrap max-md:flex-col-reverse">
        <div className="md:w-[32%] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d357575.5950795837!2d-74.0415259424582!3d45.55918948461851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C%20QC%2C%20Canada!5e0!3m2!1sen!2s!4v1731563393251!5m2!1sen!2s"
            frameBorder="0"
            className="w-full mx-auto lg:h-[600px]"
          ></iframe>
        </div>
        <div className="bg-white md:w-[65%] border shadow rounded-md flex items-center justify-between p-5 flex-wrap">
          {inputs?.map((item, i) => (
            <Input
              name={item?.name}
              placeholder={item?.title}
              classNameInput={"bg-[#FAFAFA] p-4 rounded-md w-full"}
              className={"w-full md:w-[48%] mb-5"}
              type={item.type || "text"}
              key={i}
            />
          ))}
          <Input
            placeholder={"Choose an appointment"}
            classNameInput={"bg-[#FAFAFA] p-4 rounded-md w-full"}
            className={"w-full mb-5"}
            type={"date"}
          />
          <textarea
            name=""
            placeholder="Notes"
            className="bg-[#fafafa] p-4 rounded-md w-full block border min-h-40"
            id=""
          ></textarea>
          <button className="btn block mx-auto w-full md:w-1/3 p-3 rounded-md mt-5">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
