"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { addContent } from "~/server/actions/add-content";

export default function AddVerse(props: { totalPages: number }) {
  const { totalPages } = props;

  const verseRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [onGoing, setOnGoing] = useState(false);

  const handleSubmit = async () => {
    if (onGoing) {
      toast.error("One request already submitted", { id: "add-verse" });
      return;
    }

    if (!verseRef.current?.value) {
      toast.error("Please add content to continue", { id: "add-verse" });
      return;
    }

    toast.loading("adding your dialouge...", { id: "add-verse" });
    setOnGoing(true);
    try {
      let createdBy = undefined;
      if (nameRef.current?.value) {
        createdBy = nameRef.current.value;
      }
      await addContent({
        totalPages,
        content: verseRef.current.value,
        createdBy,
      });
      toast.success("Successfully added your dialouge!", { id: "add-verse" });
    } catch {
      toast.error("something went wrong!", { id: "add-verse" });
    }

    setOnGoing(false);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-5/6 border shadow-xl rounded-xl p-5 gap-5 bg-blue-100">
        <label className="text-xl font-semibold text-gray-800">
          Keep the conversation going!
        </label>
        <div className="flex justify-center w-full gap-10">
          <textarea
            maxLength={450}
            ref={verseRef}
            className="border rounded-xl p-2 w-3/4 h-30"
            placeholder="Type anything you want!"
          />
        </div>
        <div className="flex justify-center w-full gap-10">
          <label>What can we call you</label>
          <input
            maxLength={250}
            ref={nameRef}
            placeholder="Any name you want!"
            className="border rounded-xl p-2"
          />
        </div>
        <button
          className="border rounded-xl shadow-xl px-8 py-2 hover:scale-105 bg-blue-500 mt-5 text-white font-semibold"
          onClick={handleSubmit}
        >
          Add My Dialouge
        </button>
      </div>
    </div>
  );
}
