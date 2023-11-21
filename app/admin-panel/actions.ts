"use server";
import { writeToJSON } from "@/utils/fileSystem";
import { revalidatePath } from "next/cache";

export const saveFileAction = async (formData: FormData) => {
  try {
    let data: Record<string, boolean> = {};
    for (const entr of formData.entries()) {
      if (!RegExp(/\$Action_id/i).test(entr[0])) {
        //filter out server action id
        data[entr[0]] = true;
      }
    }
    console.log(data);
    writeToJSON(data);
    return revalidatePath("/admin-panel");
  } catch (e) {
    return { message: "failed to save data" };
  }
};
