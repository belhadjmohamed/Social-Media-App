export const checkimage = (file) => {
    let err="";
    if (!file) return err = "file not found";
    if (file.size >1024 *1024) return err ="file size should be less than 1mb";
    if (file.type !== 'image/jpeg' && file.type !== "image/png" ) return err = "file not supported" ;

}


export const imageupload = async(images) => {
    let imgArr = [] 
    for (const items of images){
        const formData = new FormData();
        if (items.camera){
            formData.append('file', items.camera)
        }else{
            formData.append("file", items)
        }
        
        formData.append('upload_preset','tvme5as9')
        formData.append('cloud_name','dmuw4f7xo')

        const res = await fetch('https://api.cloudinary.com/v1_1/dmuw4f7xo/upload',{
            method : 'POST',
            body : formData
        })

        const data = await res.json();
        imgArr.push({public_id : data.public_id, secure_url : data.secure_url})
        console.log(data);
    }
    return imgArr;
}