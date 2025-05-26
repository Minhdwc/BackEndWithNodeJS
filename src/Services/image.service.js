const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
require('dotenv').config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const generateUniqueFileName = (originalName) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
};

const uploadFileToSupabase = async (file) => {
  try {
    if (!file || !file.buffer) {
      throw new Error('Invalid file data');
    }

    const fileBuffer = file.buffer;
    const fileName = generateUniqueFileName(file.originalname);
    
    const { data, error } = await supabase.storage
      .from('PetStore')
      .upload(`images/${fileName}`, fileBuffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Failed to upload to Supabase: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase
      .storage
      .from('PetStore')
      .getPublicUrl(data.path);

    return {
      path: data.path,
      url: publicUrl
    };
  } catch (error) {
    console.error('Error in uploadFileToSupabase:', error);
    throw error;
  }
};

module.exports = { uploadFileToSupabase };
