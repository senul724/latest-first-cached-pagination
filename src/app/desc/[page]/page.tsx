import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { pageLimitAndOffset } from "~/utils/pages";

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
            className="flex flex-col w-3/4 leading-1.5 p-4 rounded-e-xl rounded-es-xl bg-gray-700"
            key={String(idx)}
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {el.createdBy}
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {el.createdAt.toDateString()}
              </span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {el.content}
            </p>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 text-right -m-2">
              Msg no: {el.id}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
