import { readFromJSON } from "@/utils/fileSystem";
import FlagsForm from "./flags-form";

const WriteComponent: React.FC = async () => {
  const flags = await readFromJSON();
  return (
    <>
      <FlagsForm flags={flags} />
    </>
  );
};

export default WriteComponent;
