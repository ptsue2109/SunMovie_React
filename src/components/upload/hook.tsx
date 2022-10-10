import React, { useState, useEffect } from 'react'
import ImageUploading, { ImageListType } from "react-images-uploading";


type Props = {
   maxNumber?: number;
   imageList: any
}

const UploadHook = ({ maxNumber, imageList }: Props) => {

   const [images, setImages] = useState(imageList);
   const onChange = (  
       imageList: ImageListType,
      addUpdateIndex: number[] | undefined
   ) => {
      
      setImages(imageList as never[]);
   };
   const scrollRight = () => {
      var list : any = (document.getElementById("list") as HTMLElement);
      if(list != null) list.scrollLeft += 40
   }
   const scrollLeft = () => {
      var list : any = (document.getElementById("list") as HTMLElement);
      if(list != null) list.scrollLeft -= 40
   }
   return (
      <div className='btn_upload_wrap p-5'>
         <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
         >
            {({
               imageList,
               onImageUpload,
               onImageUpdate,
               onImageRemove,
               isDragging,
               dragProps
            }) => (
               <div className="btn_upload_content">
                  <div className="upload_file_bnt max-w[404px] max-h-[104px] w-[404px] h-[404px] text-center rounded-md border-2 border-gey-700	">
                     <button
                        className=''
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                     >
                        <div className="">
                           <img
                              src="https://dropzone-ex.vercel.app/assets/upload.d2298823.svg"
                              alt="uploadIcon"
                              className="inline mt-5"
                           />
                           <p>Upload or drag</p>

                        </div>
                     </button>
                  </div>

                  <div className="list mt-3  max-w-[404px] overflow-x-scroll scroll-smooth" id="list">
                     <img src={imageList.length > 0 ? '../../../svg/upload/preStep.svg' : `${import.meta.env.VITE_HIDDEN_SRC}`}
                        className="w-5 h-5 absolute top-[292px] left-[225px] cursor-pointer "
                        onClick={scrollLeft}
                     />
                      <img src={imageList.length > 0 ? '../../../svg/upload/nextStep.svg' : `${import.meta.env.VITE_HIDDEN_SRC}`}
                        className="w-5 h-5 absolute top-[292px] right-[865px] cursor-pointer"
                        onClick={scrollRight}
                     />
                     <div className="list_content flex gap-3 items-center h-[60px] ">

                        {imageList.map((image: any, index: any) => (
                           <div key={index}>
                              <div className="list_image flex w-[120px]  justify-around border-2 border-grey-200" >
                                 <img src={image.dataURL ?? image} alt="" className="w-full h-8 max-w-none m-2" onDoubleClick={() => onImageUpdate(index)} />
                                 <div className="image-item__btn-wrapper ">
                                    <button onClick={() => onImageRemove(index)} className="delete">
                                       <img src="../../../public/svg/upload/close.svg" width="20px" />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}
         </ImageUploading>
      </div>
   )
}

export default UploadHook