import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import useAuth from "./../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { TbEdit } from "react-icons/tb";
import { MdFolderDelete } from "react-icons/md";

const ManagePersonalNotes = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingNote, setEditingNote] = useState(null);

  const { data: notes, isLoading, refetch } = useQuery({
    queryKey: ["personalNotes"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/personal-notes?email=${user.email}`
      );
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/personal-notes/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Note deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete note: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedNote }) => {
      const { data } = await axiosSecure.put(
        `/personal-notes/${id}`,
        updatedNote
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Note updated successfully");
      refetch();
      setEditingNote(null);
    },
    onError: (error) => {
      toast.error(`Failed to update note: ${error.message}`);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedNote = {
      title: editingNote.title,
      description: editingNote.description,
    };
    updateMutation.mutate({ id: editingNote._id, updatedNote });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Helmet>
        <title>Manage Personal Notes</title>
      </Helmet>
      <SectionTitle heading="Manage Personal Notes" />
      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id} className="bg-white shadow-md hover:shadow-2xl hover:shadow-green-100 rounded-lg p-6 mb-10 border">
            {editingNote && editingNote._id === note._id ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, title: e.target.value })
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <textarea
                  value={editingNote.description}
                  onChange={(e) =>
                    setEditingNote({
                      ...editingNote,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  rows="3"
                ></textarea>
                <button
                  type="submit"
                  className="py-1 px-4 bg-green-500 text-white rounded mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="py-1 px-4 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h2 className="text-lg font-semibold">🌼 {note.title}</h2>
                <p className="text-gray-700 my-2">{note.description}</p>
                <button
                  onClick={() => handleEdit(note)}
                  className="py-1 px-4 bg-sky-500 text-white rounded mr-2 mt-4"
                >
                  <TbEdit />
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="py-1 px-4 bg-red-500 text-white rounded"
                >
                  <MdFolderDelete />
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
};

export default ManagePersonalNotes;
