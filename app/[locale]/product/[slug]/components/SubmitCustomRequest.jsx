import React from "react";
import Modal from "../../../components/ui/Modal";
import { CircleX } from "lucide-react";
import Select from "../../../components/ui/Select";

function SubmitCustomRequest({ open, close }) {
  return (
    <Modal className={"md:max-w-4xl md:p-10"} open={open} close={close}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-sm md:text-xl">Request a custom product</h1>
        <CircleX className="cursor-pointer" onClick={close} />
      </div>
      <img src="/icon/line.png" alt="" />

      <div className="md:flex items-center justify-between md:mt-10">
        <Select
          className={"w-full mt-5 md:w-96 p-5 border rounded-lg bg-gray-200"}
          onChange={() => {}}
          options={[]}
          value={"Required color"}
        />
        <Select
          className={"w-full mt-5 md:w-96 p-5 border rounded-lg bg-gray-200"}
          onChange={() => {}}
          options={[]}
          value={"Required size"}
        />
      </div>
      <Select
        className={"w-full p-5 border rounded-lg bg-gray-200 my-5"}
        onChange={() => {}}
        options={[]}
        value={"Number of pieces required"}
      />
      <button
        onClick={close}
        className="btn block mx-auto w-full md:w-1/3 p-3 rounded-lg"
      >
        Send
      </button>
    </Modal>
  );
}

export default SubmitCustomRequest;
