const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const uploadFileToSupabase = async (file) => {
  const fileBuffer = file.buffer;
  const fileName = file.originalname+Date.now();
  
  try {
    const { data, error } = await supabase.storage
      .from('PetStore')
      .upload(`images/${fileName}`, fileBuffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw error;
    }
    const publicUrl = supabase
      .storage
      .from('PetStore')
      .getPublicUrl(data.path);
    return {
      path: data.path,
      url: publicUrl.data.publicUrl,
    };
  } catch (error) {
    console.error('Error uploading file to Supabase:', error);
    throw error;
  }
};

module.exports = { uploadFileToSupabase };
