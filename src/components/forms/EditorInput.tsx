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
  const editorRef = useRef<any>(null);

  // Mirror any <style>...</style> found in the content into the editor iframe <head>
  const syncInlineStylesToHead = () => {
    const ed = editorRef.current;
    if (!ed) return;

    // Get current HTML (as TinyMCE has it)
    const html = ed.getContent({ format: "html" });

    // Extract ALL <style>...</style> blocks from content
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let combinedCSS = "";
    let match: RegExpExecArray | null;
    while ((match = styleRegex.exec(html)) !== null) {
      combinedCSS += match[1] + "\n";
    }

    // Write combined CSS into a single <style id="user-inline-styles"> in the iframe <head>
    const doc = ed.getDoc(); // iframe document
    if (!doc) return;

    let styleEl: HTMLStyleElement;

    const existing = doc.getElementById(
      "user-inline-styles"
    ) as HTMLStyleElement | null;
    if (existing) {
      styleEl = existing;
    } else {
      styleEl = doc.createElement("style");
      styleEl.type = "text/css";
      styleEl.id = "user-inline-styles";
      doc.head.appendChild(styleEl);
    }

    styleEl.textContent = combinedCSS;
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <Editor
        id={name}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(_, editor) => {
          editorRef.current = editor;
          // After init, ensure existing content styles apply
          setTimeout(syncInlineStylesToHead, 0);
        }}
        value={value}
        onEditorChange={(content) => {
          onChange(content);
          // keep styles in sync whenever content changes
          syncInlineStylesToHead();
        }}
        init={{
          height: 360,
          menubar: false,
          branding: false,
          plugins: [
            "lists",
            "link",
            "table",
            "autolink",
            "preview",
            "code",
            "paste",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link table | code preview",

          // 1) Allow <style> tags and style attributes
          //    (We still keep a whitelist of styles via valid_styles below)
          extended_valid_elements:
            "style[type|media],p[*],span[*],div[*],h1[*],h2[*],h3[*],h4[*],h5[*],h6[*]," +
            "a[href|target|rel|class|style],img[src|alt|width|height|class|style]," +
            "ul[*],ol[*],li[*],blockquote[*],code[*],pre[*],strong[*],em[*],u[*],br",

          // Allow <style> as a child of <body>
          valid_children: "+body[style]",

          // 2) Whitelist CSS properties we’ll accept in style=""
          valid_styles: {
            "*":
              "color,background-color,font-size,font-family,text-align," +
              "font-weight,font-style,text-decoration,letter-spacing,line-height," +
              "margin,margin-top,margin-right,margin-bottom,margin-left," +
              "padding,padding-top,padding-right,padding-bottom,padding-left," +
              "border,border-top,border-right,border-bottom,border-left,border-color,border-width,border-style",
          },

          // Optional paste behavior (keep formatting)
          paste_as_text: false,

          // Editor chrome styling (only affects the editing iframe, not saved HTML)
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6 } " +
            "p { margin: 0 0 0.75em }",
        }}
      />
    </div>
  );
};

export default EditorInput;
