import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";
import { Cabin } from "@/app/_types/types";

const CabinList = async ({ filter }: { filter: string }) => {
  noStore();
  const cabins: Cabin[] = await getCabins();

  let displayedCabins: Cabin[];

  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => {
      return cabin.maxCapacity <= 3;
    });
  else if (filter === "medium")
    displayedCabins = cabins.filter((cabin) => {
      return cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;
    });
  else if (filter === "large")
    displayedCabins = cabins.filter((cabin) => {
      return cabin.maxCapacity >= 8;
    });
  else displayedCabins = cabins;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
