"use client";

import { Card, Image } from "@nextui-org/react";

interface ImgViewerProps {
  imgUrl: string;
}

export default function ImageViewer(props: ImgViewerProps) {
  return (
    <>
      <Card isBlurred className="z-40 fixed w-3/4 h-3/4 justify-self-center self-center overflow-visible top-24 flex items-center justify-center">
        <Image isZoomed src={props.imgUrl} width={650} />
      </Card>
    </>
  );
}
