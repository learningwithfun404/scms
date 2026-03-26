const IMGBB_API_KEY = "7634bc460cb470e64e8653e26939059c";

const uploadImageToImgBB = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error("Image upload failed");
  }

  return data.data.url;
};

export default uploadImageToImgBB;
