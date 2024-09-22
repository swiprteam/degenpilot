import logo from "@/assets/logo.png";
import { PropsWithoutRef } from "react";
const Logo = (props: PropsWithoutRef<any>) => {
  return <img src={logo} alt="degenpilot logo" {...props} />;
};

export default Logo;
