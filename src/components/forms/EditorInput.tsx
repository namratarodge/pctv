"use client";

import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";

type EditorInputProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

const EditorInput: React.FC<EditorInputProps> = ({
  name,
  value,
  onChange,
  label,
}) => {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(_, editor) => (editorRef.current = editor)}
        value={value}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "lists",
            "link",
            "table",
            "autolink",
            "preview",
            "code", // 👈 add this
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link table | code preview", // 👈 include `code`
          branding: false,
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(content) => onChange(content)}
      />
    </div>
  );
};

export default EditorInput;
