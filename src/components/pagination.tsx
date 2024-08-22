"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Pagination(
  props: { pageCount: number },
) {
  const { pageCount } = props;

  const pathname = usePathname();
  const router = useRouter();

  const pageNo = Number(pathname.split("/")[2]);
  return (
    <div className="w-2/3 flex items-center justify-center">
      <FaChevronLeft
        size={25}
        className="cursor-pointer hover:scale-105"
        onClick={() => {
          if (pageNo > 1) {
            router.push(`/view/${pageNo - 1}`);
          }
        }}
      />
      <p className="w-1/2 text-center text-xl text-gray-800">
        page {pageNo} of {pageCount}
      </p>
      <FaChevronRight
        size={25}
        className="cursor-pointer hover:scale-105"
        onClick={() => {
          if (pageNo < pageCount) {
            router.push(`/view/${pageNo + 1}`);
          }
        }}
      />
    </div>
  );
}
