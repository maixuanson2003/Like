import request from "utils/request"

export const uploadFile = (data) => {
    return request(`/api/file/upload`,{
        method: "POST",
        data,
        headers: {
            "Content-Type": "multipart/form-data",
          },      
    });
}

export const viewFile = (fileName) => {
    return request(`/api/file/view/${fileName}`);
}

export const downloadFile = (fileName) => {
    return request(`/api/file/download/${fileName}`,{
        responseType: "blob"
    })
}
