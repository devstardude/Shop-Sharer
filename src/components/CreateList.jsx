import React from "react";
import * as db from "../firestore";
import {mutate} from "swr";

const DEFAULT_LIST = {
  name: "",
  description: "",
  image: null,
};

function CreateList({ user }) {
  const [list, setList] = React.useState(DEFAULT_LIST);
  const [submitting, setSubmitting] = React.useState(false);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (files) {
      const image = files[0];
      console.log(image);
      setList((prevState) => ({ ...prevState, image }));
    } else {
      setList((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  async function handleCreateList() {
    try {
      setSubmitting(true);
      await db.createList(list, user);
      mutate(user.uid);
      setList(DEFAULT_LIST);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
        WELCOME, {user.displayName.toUpperCase()}
      </h1>
      <p className="lg:w-2/3 mx-auto mb-12 leading-relaxed text-base">
        To get started, create a list with a name and a cover image
      </p>
      <div className="lg:w-2/6 mx-auto md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <input
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add list name"
          type="text"
          name="name"
          value={list.name}
          required
          onChange={handleChange}
        />
        <textarea
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add short description"
          type="text"
          name="description"
          value={list.description}
          onChange={handleChange}
        />
        <input
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add list name"
          type="file"
          name="image"
          onChange={handleChange}
        />
        {/* display preview image */}
        {list.image && (
          <img className="mb-4" src={URL.createObjectURL(list.image)} />
        )}
        <button
          disabled={submitting}
          onClick={handleCreateList}
          className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
        >
          {submitting ? "Creating..." : "Create List"}
        </button>
        <p className="text-xs text-gray-600 mt-3">*List name required</p>
      </div>
    </div>
  );
}

export default CreateList;
