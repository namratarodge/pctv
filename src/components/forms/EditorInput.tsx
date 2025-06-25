"use client";

import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";

type EditorInputProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

const EditorInput: React.FC<EditorInputProps> = ({ name, value, onChange, label }) => {
  const editorRef = useRef<any>(null);

  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && <label className="text-sm font-medium text-gray-700">{label} {name}</label>}
      <Editor
       apiKey="whyb8cfl1fqwrtall8smrpnhlfuvz9jf6mr8qbh325zepvvp"
        onInit={(_, editor) => (editorRef.current = editor)}
        value={value}
        init={{
          height: 300,
          menubar: false,
          toolbar:
            "undo redo | formatselect | bold italic | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
          branding: false,
        }}
        onEditorChange={(content) => onChange(content)}
      />
    </div>
  );
};

export default EditorInput;