import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import Cropper, { CropperProps } from "react-easy-crop";
import { Button } from "@/components/ui/button";

type ImageCropperProps = Partial<
  Omit<
    CropperProps,
    "crop" | "zoom" | "rotation" | "onCropChange" | "onZoomChange"
  >
>;

const ImageCropper = ({ image, ...props }: ImageCropperProps) => {
  const [corpState, setCropState] = useState({
    crop: { x: 0, y: 0 },
    zoom: 1,
  });

  return (
    <div className="grid gap-4">
      <div className="relative h-96 w-full">
        <Cropper
          aspect={10 / 9}
          classes={{
            mediaClassName: "object-cover object-top",
          }}
          crop={corpState.crop}
          image={image}
          onCropChange={(crop) => {
            setCropState({ ...corpState, crop });
          }}
          onZoomChange={(zoom) => setCropState({ ...corpState, zoom })}
          showGrid={false}
          zoom={corpState.zoom}
          {...props}
        />
      </div>
      <div className="flex items-center justify-between">
        <Button
          onClick={() => {
            setCropState({ ...corpState, zoom: corpState.zoom - 0.1 });
          }}
          size="icon"
          type="button"
          variant="ghost"
        >
          <span className="sr-only">ズームアウト</span>
          <Minus />
        </Button>
        <Button
          onClick={() => {
            setCropState({ crop: { x: 0, y: 0 }, zoom: 1 });
          }}
          size="sm"
          type="button"
          variant="default"
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            setCropState({ ...corpState, zoom: corpState.zoom + 0.1 });
          }}
          size="icon"
          type="button"
          variant="ghost"
        >
          <span className="sr-only">ズームイン</span>
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export { ImageCropper };
