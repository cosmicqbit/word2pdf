import { FaFileWord } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConvert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        {
          responseType: "blob",
        }
      );
      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      const link = document.createElement("a");
      console.log(link);
      link.href = url;
      console.log(link);
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      console.log(link);
      document.body.appendChild(link);
      console.log(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvert("File Converted Successfully");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status == 400) {
        setDownloadError("Error occurred: ", error.response.data.message);
      } else {
        setConvert("");
      }
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto py-3 md:px-40">
      <div className="h-[90vh] justify-center items-center flex">
        <div className="mx-4 flex flex-col py-20 justify-center items-center border border-dashed  border-blue-700 rounded shadow-lg">
          <h1 className="font-bold text-4xl mb-5 text-center">
            Convert Word to PDF Online
          </h1>
          <p className="text-gray-600 mb-6 px-4 text-center">
            Easily convert Word documents to PDF format, without installing any
            software
          </p>
          <input
            type="file"
            accept=".doc, .docx"
            className="mb-4 hidden"
            id="FileInput"
            onChange={handleFileChange}
          ></input>
          <label
            htmlFor="FileInput"
            className="bg-blue-500 flex items-center justify-center shadow-md cursor-pointer text-white hover:scale-105 duration-300 hover:bg-blue-600 px-20 py-4 mb-4"
          >
            <FaFileWord />
            <span className="ml-3">
              {selectedFile ? selectedFile.name : "CHOOSE FILE"}
            </span>
          </label>
          <button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="bg-blue-500 text-white px-10 py-2 shadow-sm cursor-pointer hover:bg-blue-600 disabled:bg-gray-500 disabled:pointer-events-none  rounded"
          >
            Convert File
          </button>
          {convert && (
            <div className="text-green-500 mt-1 text-center">{convert} </div>
          )}
          {downloadError && (
            <div className="text-red-500 mt-1 text-center">{downloadError}</div>
          )}
        </div>
      </div>
    </div>
  );
}
