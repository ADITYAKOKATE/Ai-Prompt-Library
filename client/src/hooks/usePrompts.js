import { usePromptContext } from "../context/PromptContext";

const usePrompts = () => {
  return usePromptContext();
};

export default usePrompts;