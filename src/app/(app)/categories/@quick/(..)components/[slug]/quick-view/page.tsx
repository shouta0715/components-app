import React from "react";
import { InterceptingModalProvider } from "@/components/elements/intercepting-modal";
import { DialogContent } from "@/components/ui/dialog";
import { Params } from "@/types/next";

export default function Page({ params }: Params) {
  return (
    <InterceptingModalProvider>
      <DialogContent>
        <h1>Quick View</h1>
        <p>Params: {JSON.stringify(params)}</p>
      </DialogContent>
    </InterceptingModalProvider>
  );
}
