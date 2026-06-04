import * as runtime from "react/jsx-runtime";
import { CodeCopyEnhancer } from "./code-copy-enhancer";

type PostContentProps = {
  code: string;
};

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn(runtime).default;
}

export function PostContent({ code }: PostContentProps) {
  const Component = useMDXComponent(code);

  return (
    <>
      <Component />
      <CodeCopyEnhancer />
    </>
  );
}
