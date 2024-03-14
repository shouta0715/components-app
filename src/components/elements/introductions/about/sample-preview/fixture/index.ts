import { FileObject } from "@/services/files/get";

// TODO: 見本用のデータを取得する
export const sampleObject: FileObject[] = [
  {
    id: "1",
    name: "sample",
    extension: "tsx",
    file: "export const Example = () => <div>Example</div>;",
    componentId: "1",
  },
];
