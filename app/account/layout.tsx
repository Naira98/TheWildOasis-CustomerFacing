import { ReactElement } from "react";
import SideNavigation from "@/app/_components/SideNavigation";

const layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="grid grid-cols-[12rem_1fr] sm:grid-cols[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
};

export default layout;
