import Image, { type ImageProps } from "next/image";

import styles from "./page.module.css";
import { Button } from "@/components/ui/button";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className="bg-red-400">
      hello world
      <Button variant={"ghost"}>hello world</Button>
    </div>
  );
}
