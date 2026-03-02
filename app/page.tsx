import { supabase } from "@/lib/supabase";
import Link from "next/link";

type NovelRow = {
  id: number | string;
  title: string;
  author?: string | null;
  description?: string | null;
  cover_url?: string | null;
};

export default async function Home() {
  const { data } = await supabase
    .from("novels")
    .select("*")
    .order("id", { ascending: true });
  const novels = (data ?? []) as NovelRow[];

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#1f1f1f]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-xl border border-[#e7e7e7] bg-white px-5 py-5 sm:px-6">
          <p className="text-xs tracking-[0.15em] text-[#8b8b8b]">
            嗜睡魔威廉个人小说站
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">书架</h1>
          <p className="mt-2 text-sm text-[#666]">
            共收录 {novels.length} 本作品
          </p>
        </header>

        {novels.length === 0 ? (
          <section className="rounded-xl border border-dashed border-[#d9d9d9] bg-white px-6 py-12 text-center text-[#666]">
            书架还是空的，去 Supabase 的 <code>novels</code>{" "}
            表里新增第一本书吧。
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {novels.map((novel) => {
              const coverUrl = novel.cover_url?.trim();

              return (
                <Link
                  key={novel.id}
                  href={`/novel/${novel.id}`}
                  className="group block"
                >
                  <article className="flex h-full gap-4 rounded-xl border border-[#e8e8e8] bg-white p-4 transition duration-200 hover:border-[#d6d6d6] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={`${novel.title} 封面`}
                        className="h-[120px] w-[88px] flex-none rounded-md border border-[#ececec] object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-[120px] w-[88px] flex-none rounded-md bg-gradient-to-b from-[#e6e6e6] to-[#d8d8d8]" />
                    )}

                    <div className="min-w-0 flex-1">
                      <h2 className="clamp-2 text-lg font-semibold leading-7 transition-colors group-hover:text-[#bf2c24]">
                        {novel.title}
                      </h2>
                      <p className="mt-1 text-sm text-[#666]">
                        {novel.author || "佚名"}
                      </p>
                      <p className="clamp-3 mt-3 text-sm leading-6 text-[#777]">
                        {novel.description ||
                          "暂无简介，点击进入目录查看最新章节。"}
                      </p>

                      <div className="mt-4 inline-flex items-center text-sm font-medium text-[#bf2c24]">
                        进入目录
                        <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
