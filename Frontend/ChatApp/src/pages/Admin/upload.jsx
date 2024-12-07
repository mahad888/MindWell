import React, { useState } from 'react'; 
import {
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Container,
    Paper,
    Box,
    CircularProgress
} from '@mui/material'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { doc, setDoc } from 'firebase/firestore'; 
import { storage, firestore } from './firebase-config';  

const MediaUpload = ({ userId }) => {
   const [file, setFile] = useState(null);
   const [uploading, setUploading] = useState(false);
   const [categories, setCategories] = useState({
     mindfulnessAudio: false,
     mindfulnessVideo: false,
     breathingAudio: false,
     breathingVideo: false
   });
    
   const handleFileChange = (e) => {
     setFile(e.target.files[0]);
   };
    
   const handleCategoryChange = (category) => {
     // Uncheck all categories first, then check the selected one
     const newCategories = Object.keys(categories).reduce((acc, key) => {
       acc[key] = key === category;
       return acc;
     }, {});
     setCategories(newCategories);
   };
    
   const handleUpload = async () => {
     if (!userId) {
       alert('User ID is required for upload!');
       return;
     }

     if (!file) {
       alert('Please select a file first!');
       return;
     }
      
     const selectedCategory = Object.keys(categories)
       .find(key => categories[key]);

     if (!selectedCategory) {
       alert('Please select a category!');
       return;
     }

     try {
       setUploading(true);
       
       // Generate a unique filename to prevent overwrites
       const uniqueFileName = `${Date.now()}_${file.name}`;
       
       // Construct the storage path
       const storageRef = ref(
         storage,
         `users/${userId}/${selectedCategory}/${uniqueFileName}`
       );
        
       // Upload the file
       const snapshot = await uploadBytes(storageRef, file);
        
       // Get download URL
       const downloadURL = await getDownloadURL(snapshot.ref);
        
       // Create a unique document ID
       const docId = `${userId}_${selectedCategory}_${uniqueFileName}`;
        
       // Save metadata to Firestore
       await setDoc(
         doc(firestore, 'userMedia', docId),
         {
           userId,
           category: selectedCategory,
           fileName: uniqueFileName,
           originalFileName: file.name,
           downloadURL,
           uploadedAt: new Date().toISOString()
         }
       );
        
       alert('Upload successful!');
       
       // Reset form
       setFile(null);
       setCategories({
         mindfulnessAudio: false,
         mindfulnessVideo: false,
         breathingAudio: false,
         breathingVideo: false
       });
     } catch (error) {
       console.error('Detailed Upload Error:', {
         code: error.code,
         message: error.message,
         name: error.name,
         stack: error.stack
       });
       
       // More specific error handling
       let errorMessage = 'Upload failed';
       if (error.code === 'storage/unauthorized') {
         errorMessage = 'You do not have permission to upload files.';
       } else if (error.code === 'storage/canceled') {
         errorMessage = 'Upload was canceled.';
       } else if (error.code === 'storage/unknown') {
         errorMessage = 'An unknown error occurred during upload.';
       }
       
       alert(errorMessage);
     } finally {
       setUploading(false);
     }
   };
    
   return (
     <Container maxWidth="sm">
       <Paper elevation={3} sx={{
         padding: 3,
         marginTop: 4,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center'
       }}>
         <Typography variant="h5" gutterBottom>
           Media Upload
         </Typography>
         
         <input
           type="file"
           onChange={handleFileChange}
           style={{ margin: '16px 0' }}
         />
         
         <Box sx={{
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'start',
           width: '100%'
         }}>
           {Object.keys(categories).map((category) => (
             <FormControlLabel
               key={category}
               control={
                 <Checkbox
                   checked={categories[category]}
                   onChange={() => handleCategoryChange(category)}
                 />
               }
               label={category.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}
             />
           ))}
         </Box>
         
         <Button
           variant="contained"
           color="primary"
           onClick={handleUpload}
           disabled={!file || uploading}
           sx={{ marginTop: 2 }}
         >
           {uploading ? <CircularProgress size={24} /> : 'Upload'}
         </Button>
       </Paper>
     </Container>
   );
};

export default MediaUpload;