export const fileformat = (url)=>{
    const fileExtension = url.split('.').pop().toLowerCase();
    if(fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg'){
        return 'video'
    }
    if(fileExtension === 'mp3' || fileExtension === 'wav'){
        return 'audio'
    }
    if(fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif'){
        return 'image'
    }
    return 'file'


}
 export const transformImage = (url = "", width = 100) => {
    const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  
    return newUrl;
  };
  

import moment from "moment";

export const getlast7days = ()=>{
    let days = [];
    for(let i = 0; i < 7; i++){
        days.push(moment().subtract(i, 'days').format('dddd'))
    }
    return days.reverse()
}

export const getOrSaveFromStorage = ({ key, value = null, get = false }) => {
    try {
      if (get) {
        const storedItem = localStorage.getItem(key);
        return storedItem ? JSON.parse(storedItem) : null;
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  };
  