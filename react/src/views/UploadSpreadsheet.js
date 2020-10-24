import React, { useState, useEffect } from 'react';

const UploadSpreadsheet = ({ submit }) => {
  const [drivers, setDrivers] = useState(1)

  return (
    <div className="App bg-gray h-screen">
      <div className="">
        <img className="mx-auto pt-10" src="https://storage.googleapis.com/publicapeedback/router/router-logo.png" />
      </div>
      <img className="mx-auto mt-32 mb-8" src="https://storage.googleapis.com/publicapeedback/router/file-icon.png" />
      <div className="w-auto text-center mx-auto">
        <p className="text-3xl mb-5 font-bold">Find and upload your list file.</p>
        <input
          onChange={(e) => {
            submit(e.target.files[0])
          }}
          type="file"
          class="custom-file-input"
        />
      </div>
    </div>
  )
}

export default UploadSpreadsheet