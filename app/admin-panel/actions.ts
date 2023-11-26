"use server";
import { writeToJSON } from "@/utils/fileSystem";
import { revalidatePath } from "next/cache";

export type Messages = "Successfully saved data" | "Failed to save data";
export const saveFileAction = async (
  _prevState: { message: Messages } | void,
  formData: FormData
): Promise<{ message: Messages }> => {
  try {
    let data: Record<string, boolean> = {};
    for (const entr of formData.entries()) {
      if (!RegExp(/\$Action_/i).test(entr[0])) {
        //filter out server action id
        data[entr[0]] = true;
      }
    }
    console.log(data);
    writeToJSON(data);
    revalidatePath("/admin-panel");
    return { message: "Successfully saved data" };
  } catch (e) {
    return { message: "Failed to save data" };
  }
};
