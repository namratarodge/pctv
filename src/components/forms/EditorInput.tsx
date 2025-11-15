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

    const html = ed.getContent({ format: "html" });

    // Extract ALL <style>...</style> blocks from content
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let combinedCSS = "";
    let match: RegExpExecArray | null;
    while ((match = styleRegex.exec(html)) !== null) {
      combinedCSS += match[1] + "\n";
    }

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
          setTimeout(syncInlineStylesToHead, 0);
        }}
        value={value}
        onEditorChange={(content) => {
          onChange(content);
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
            "media",
          ],

          // 👇 allow ALL elements + attributes
          valid_elements: "*[*]",

          toolbar:
            "undo redo | blocks | bold italic underline | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link table media | code preview",

          // 👇 just extend for style + iframe (no need to repeat all tags)
          extended_valid_elements:
            "iframe[src|width|height|frameborder|style|class|referrerpolicy|sandbox]",

          // 👇 allow iframe in body/div/p
          valid_children: "+body[style|iframe],+div[iframe],+p[iframe]",

          valid_styles: {
            "*":
              "color,background-color,font-size,font-family,text-align," +
              "font-weight,font-style,text-decoration,letter-spacing,line-height," +
              "margin,margin-top,margin-right,margin-bottom,margin-left," +
              "padding,padding-top,padding-right,padding-bottom,padding-left," +
              "border,border-top,border-right,border-bottom,border-left,border-color,border-width,border-style",
          },

          paste_as_text: false,

          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6 } " +
            "p { margin: 0 0 0.75em }",

          setup: (editor: any) => {
            editor.on("PreProcess", (e: any) => {
              // remove sandbox attribute from all iframes BEFORE saving content
              e.node.querySelectorAll("iframe").forEach((el: any) => {
                el.removeAttribute("sandbox");
              });
            });
            editor.on("PostProcess", (e: any) => {
              // remove sandbox AFTER loading content
              const div = document.createElement("div");
              div.innerHTML = e.content;
              div.querySelectorAll("iframe").forEach((el) => {
                el.removeAttribute("sandbox");
              });
              e.content = div.innerHTML;
            });
          },
        }}
      />
    </div>
  );
};

export default EditorInput;
