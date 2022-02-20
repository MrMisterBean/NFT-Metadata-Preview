import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload32 } from "@carbon/icons-react"
import ClipLoader from "react-spinners/ClipLoader"

function FileInput({ setRawJsonInput, setLoading, loading }) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.addEventListener('loadstart', () => {
        setLoading(true)
        console.log('Loading set to True')
      })
      reader.addEventListener('loadend', () => {
        setLoading(false)
        console.log('Loading set to False')
      })

      reader.onload = () => {
        console.log('File Uploaded')
        const binaryStr = reader.result
        setRawJsonInput(JSON.parse(binaryStr))
      }
      reader.readAsText(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="flex content-center ml-6 pt-12 mt-8 text-center justify-center" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <div className="flex shadow-lg  hover:shadow-blue-300 active:shadow-blue-600 text-[#69cdee] flex-col gap-4 place-items-center resize-y border-[1px] border-solid rounded-b-lg border-[#69cdee] bg-[#edf9fe] py-12 px-[2.45rem]">
            <Upload32 className="animate-[spin_1s_ease-in-out_1]" />
            <p className="text-2xl text-[#a3aab6]">
              Drop your file!
            </p>
          </div>
          :
          <div className="flex shadow-inner hover:shadow-blue-300 active:shadow-blue-600 text-[#69cdee] flex-col gap-4 place-items-center resize-y border-[1px] border-solid rounded-b-lg border-[#69cdee] bg-[#edf9fe] py-12 px-4">
            <Upload32 />
            <p className="text-2xl text-[#a3aab6]">
              Drag & Drop JSON
            </p>
          </div>
      }
      {/* {
        (!loading) ?
          null :
          <ClipLoader loading={loading} size={150} />
      } */}
    </div>
  )
}

// {
//   isDragActive ?
//     <div className="h-full w-2/3 py-10 my-12 flex rounded-md justify-center shadow-sky-200 bg-[#edf9fe] shadow-xl border-dotted text-[#5fbbda] border-[#69cdee] border-2 outline-4 ring-8 ring-offset-8 ring-[#edf9fe] ring-offset-white ">
//       <Upload32 className="h-[30%] w-[30%]" />
//     </div>
//     :
//     <div className="flex flex-col gap-4 place-items-center h-full w-2/3 py-10 my-12 rounded-md shadow-sky-200 shadow-lg bg-white text-[#5fbbda] outline-4 ring-8 ring-offset-8 ring-[#edf9fe] ring-offset-white ">
//       <Upload32 className="h-[20%] w-[20%]" />
//       <p className="text-2xl">
//         Drag & Drop JSON
//       </p>
//     </div>
// }

export default FileInput
