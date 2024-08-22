import { redirect } from "next/navigation";
import AddVerse from "~/components/add-verse";
import Pagination from "~/components/pagination";
import { getTotalPages } from "~/utils/pages";

export default async function ViewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { pages, err } = await getTotalPages();
  if (err) {
    redirect("/404");
  }

  return (
    <div className="w-full flex items-start justify-center shadow-xl">
      {children}
      <div className="w-2/5 flex flex-col justify-start items-center h-screen pt-20 gap-10">
        <AddVerse totalPages={pages} />
        <Pagination pageCount={pages} />
      </div>
    </div>
  );
}
