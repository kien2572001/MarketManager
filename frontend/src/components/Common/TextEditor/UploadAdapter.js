import axios from "axios";

export default class UploadAdapter {
  constructor(loader, url) {
    this.url = url;
    this.loader = loader;
    this.loader.file.then((pic) => (this.file = pic));

    this.upload();
  }

  // Starts the upload process.
  upload() {
    const fd = new FormData();
    fd.append("image", this.file); // your image
    fd.append("model", "ckeditor");
    // ...

    return new Promise((resolve, reject) => {
      axios
        .post(this.url, fd, {
          onUploadProgress: (e) => {
            console.log(
              // show upload process
              Math.round((e.loaded / e.total) * 100) + " %"
            );
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          //reject("Server Error");
          console.log("Server Error : ", error);
        });
    });
  }
}
