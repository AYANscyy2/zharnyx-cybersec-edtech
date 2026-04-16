"use server";

import ImageKit from "imagekit";

export async function uploadToImageKit(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const { env } = process;
    const publicKey = env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const privateKey = env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    if (!publicKey || !privateKey || !urlEndpoint) {
      return { success: false, error: "ImageKit environment variables are not correctly configured." };
    }

    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await imagekit.upload({
      file: buffer, // Buffer type is supported in backend SDKs
      fileName: file.name,
      folder: "/zharnyx_proofs",
    });

    return { success: true, url: response.url };
  } catch (error: any) {
    console.error("ImageKit upload error:", error);
    return { success: false, error: error.message || "Failed to upload image" };
  }
}
