import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Pagination Master
        </h1>
        <p>
          Efficient and cool way to use pagination for data organised from
          latest to old with caching
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="view/1"
          >
            <h3 className="text-2xl font-bold border shadow-xl rounded py-2 px-4 hover:scale-105">View demo</h3>
          </Link>
        </div>
      </div>
    </main>
  );
}
