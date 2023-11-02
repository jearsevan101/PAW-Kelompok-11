import { useLottie } from "lottie-react";
import animationData from "../public/loading.json";

const Loading = () => {

  const style = {
    height: 250,
  };

  const options = {
    loop: true,
    style: style,
    autoplay: true,
    animationData: animationData,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default Loading;
