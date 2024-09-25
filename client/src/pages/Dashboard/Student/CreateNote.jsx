import { useState } from "react";
import { Helmet } from "react-helmet";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: async (noteData) => {
      const { data } = await axiosSecure.post("/personal-notes", noteData);
      return data;
    },
    onSuccess: () => {
      toast.success("Note created successfully");
      setTitle("");
      setDescription("");
      navigate("/dashboard/manage-personal-notes");
    },
    onError: (error) => {
      toast.error(`Failed to create note: ${error.message}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = {
      email: user.email,
      title,
      description,
    };
    await mutateAsync(noteData);
  };

  return (
    <div className="max-w-lg mx-auto p-4 my-auto min-h-screen ">
      <Helmet>
        <title>Create Personal Note</title>
      </Helmet>
      <SectionTitle heading="Create Personal Note" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-green-200 to-cyan-200 hover:bg-gradient-to-r hover:from-green-400 hover:to-cyan-400 rounded transition duration-150 font-semibold "
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
