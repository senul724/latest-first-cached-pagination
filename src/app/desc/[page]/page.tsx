import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { getTotalPages, pageLimitAndOffset } from "~/utils/pages";

export default async function ViewDialogues({
  params,
}: {
  params: {
    page: string;
  };
}) {
  const pageNo = Number(params.page);

  const { limit, offset, err } = await pageLimitAndOffset(pageNo);
  if (err) {
    redirect("/404");
  }

  let dialogueList = await db.query.dialouges.findMany({
    limit,
    offset,
  });
  dialogueList = dialogueList.reverse();

  return (
    <div className="w-3/5 py-10">
      <div className="w-full flex flex-col items-center justify-center gap-1">
        {dialogueList.map((el, idx) => (
          <div
            className="w-3/4 flex flex-col items-center justify-center rounded-xl shadow border p-2"
            id={String(idx)}
          >
            <p className="text-lg text-center font-semibold text-gray-600">
              {el.content}
            </p>
            <div className="flex items-center justify-center w-full">
              <p className="w-1/2 px-2">by {el.createdBy}</p>
              <p className="w-1/2 px-2 text-right">
                {el.createdAt.toDateString()}: {el.id}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { pages, err } = await getTotalPages();

  const paths: { page: string }[] = [];

  if (err) {
    return paths;
  }

  for (let i = 1; i <= pages; i++) {
    paths.push({ page: String(i) });
  }

  return paths;
}
