"use client";
import { DataTable, ModelForm } from "@/components/forms";
import AutoCompletePersonList from "@/components/forms/AutoCompletePersonList";
import Loading from "@/components/layout/Loading";
import { CategoriesColumn } from "@/constants/DataTableColumn";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Error } from "../layout";

import { CountryFormType, TagType, UserTag } from "@/constants/Type";

type PageProps = {
  titleId: string;
  data: TagType[];
  onSubmit: () => void;
};

export default function Country({ titleId, data, onSubmit }: PageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<UserTag[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CountryFormType>();

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tags?type=production_country`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 1000,
          },
        }
      );
      if (response.data.status) {
        const transformed = response.data.data.data.map((item: TagType) => ({
          id: item._id,
          name: item.display_name,
        }));
        setLoading(false);
        setCategories(transformed);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const handleFormSubmit = async (data: CountryFormType) => {
    console.log(data);
    const payload = {
      taggable_id: titleId,
      taggable_type: "production_country",
      tag_id: data.person_id.map((user: UserTag) => user.id),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/taggable`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("Taggable created successfully:", response.data);
        setIsModalOpen(false);
        onSubmit();
      } else {
        toast("Taggable creation failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("Error creating plan:");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this keyword?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/taggable/${id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      toast("Keyword deleted successfully");
      onSubmit();
    } catch (error) {
      console.log(error);
      toast("Error deleting keyword:");
    }
  };

  useEffect(() => {
    fetch();
  }, [titleId]);

  return (
    <div className=" bg-white rounded-md ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Country</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add new Country
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={CategoriesColumn}
              data={data || []}
              renderActions={(person: any) => (
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => handleDelete(person.taggable_id)}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            />
          )}
          <ModelForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Select countries"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="flex flex-col h-30">
              <Controller
                name="person_id"
                control={control}
                rules={{ required: "Person is required" }}
                render={({ field }) => (
                  <AutoCompletePersonList
                    users={categories}
                    onSelect={(user: UserTag[]) => {
                      field.onChange(user); // updates form value
                    }}
                  />
                )}
              />
              {errors.person_id && <Error message={errors.person_id.message} />}
            </div>
          </ModelForm>
        </div>
      </div>
    </div>
  );
}
