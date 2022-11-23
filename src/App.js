import "./App.css";
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const [img, setImg] = useState(null);
  const [imgList, setImgList] = useState([]);

  const imgRef = ref(storage, "images/");
  const uploadImage = () => {
    console.log(imgList);
    if (img === null) return;
    // reference where image is uploaded
    // uploadBytes() uploads data to this object's location. the upload is not resumable
    // parameters are ref and data, ref is storage reference where data should be uloaded
    // data is the data to upload
    // ref(storage, url) returns storage reference for the given url
    // storageReference - Represents a reference to a Google Cloud Storage object. Developers can upload, download, and delete objects, as well as get/set object metadata.
    // getDownloadURL - You can get the download URL for a file by calling the getDownloadURL() method on a Cloud Storage reference.
    const imgRef = ref(storage, `images/${img.name + v4()}`);
    console.log(img);
    uploadBytes(imgRef, img).then((snapShot) => {
      getDownloadURL(snapShot.ref).then((url) => {
        setImgList((prevValue) => [...prevValue, url]);
        // console.log(snapShot.ref);
      });
    });
  };

  // console.log(imgList);

  useEffect(() => {
    // listAll - You can use listAll to fetch all results for a directory
    listAll(imgRef).then((res) => {
      console.log(res.items);
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImgList((prevValue) => [...prevValue, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImg(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload image</button>
      {imgList.map((url, index) => {
        {
          /* console.log(url); */
        }
        return (
          <img
            key={index}
            alt="pic"
            src={url}
            style={{ width: `${50}px`, height: `${50}px` }}
          />
        );
      })}
    </div>
  );
}

export default App;
