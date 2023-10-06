import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "./UploadAdapter";
import "./style.css";
const url = "http://localhost:3001/api/upload";
function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Create new object and pass server url
    return new UploadAdapter(loader, url);
  };
}
const TextEditor = ({ value, setValue }) => {
  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "fontColor",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "imageUpload",
    ],
    extraPlugins: [CustomUploadAdapterPlugin],
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={editorConfiguration}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        //console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        //console.log({ event, editor, data });
        console.log(data);
        setValue(data);
      }}
      onBlur={(event, editor) => {
        //console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        //console.log("Focus.", editor);
      }}
    />
  );
};

export default TextEditor;
