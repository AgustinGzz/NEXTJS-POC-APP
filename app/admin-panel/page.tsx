import Checkbox from "@/components/checkbox";
import { readFromJSON, writeToJSON } from "@/utils/fileSystem";
import { revalidatePath } from "next/cache";
import SubmitButton from "./submit-button";

const WriteComponent: React.FC = async () => {
  async function saveFile(formData: FormData) {
    "use server";
    let data: Record<string, boolean> = {};
    for (const entr of formData.entries()) {
      if (!RegExp(/\$Action_id/i).test(entr[0])) {
        //filter out server action id
        data[entr[0]] = true;
      }
    }
    console.log(data);
    writeToJSON(data);
    revalidatePath("/admin-panel");
  }
  const flags = await readFromJSON();
  return (
    <form action={saveFile} className='flex flex-col'>
      <h1 className='mb-3'>Turn on/off feature you wish to enable/disable</h1>
      <div className='flex flex-col items-center border-white border-2 p-4 mb-2 rounded-md'>
        <Checkbox
          name='feature1'
          label='Feature #1'
          onValue='Flag1'
          checked={!!flags?.feature1}
        />
        <Checkbox
          name='feature2'
          label='Feature #2'
          onValue='Flag2'
          checked={!!flags?.feature2}
        />
        <Checkbox
          name='feature3'
          label='Feature #3'
          onValue='Flag3'
          checked={!!flags?.feature3}
        />
      </div>
      <SubmitButton />
    </form>
  );
};

export default WriteComponent;
