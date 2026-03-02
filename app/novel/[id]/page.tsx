import { supabase } from "@/lib/supabase";
import Link from "next/link";

type NovelRow = {
  title: string;
  description?: string | null;
  author?: string | null;
  cover_url?: string | null;
};

type VolumeRow = {
  id: number;
  title: string;
  volume_order: number;
};

type ChapterRow = {
  id: number;
  title: string;
  chapter_number: number;
  volume_id: number | null;
};

type VolumeGroup = {
  key: string;
  title: string;
  order: number;
  chapters: ChapterRow[];
};

export default async function NovelDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const novelId = Number(id);

  if (Number.isNaN(novelId)) {
    return <div className="p-10 text-center text-[#666]">小说 ID 无效</div>;
  }

  const [{ data: novelData }, { data: volumeData }, { data: chapterData }] =
    await Promise.all([
      supabase
        .from("novels")
        .select("title,description,author,cover_url")
        .eq("id", novelId)
        .maybeSingle(),
      supabase
        .from("volumes")
        .select("id,title,volume_order")
        .eq("novel_id", novelId)
        .order("volume_order", { ascending: true }),
      supabase
        .from("chapters")
        .select("id,title,chapter_number,volume_id")
        .eq("novel_id", novelId)
        .order("chapter_number", { ascending: true }),
    ]);

  const novel = (novelData as NovelRow | null) ?? null;
  const volumes = (volumeData ?? []) as VolumeRow[];
  const chapters = (chapterData ?? []) as ChapterRow[];

  if (!novel && chapters.length === 0) {
    return <div className="p-10 text-center text-[#666]">小说找不到了...</div>;
  }

  const novelTitle = novel?.title ?? `小说 #${novelId}`;
  const novelDesc = novel?.description ?? "暂无简介";
  const novelAuthor = novel?.author ?? "佚名";
  const coverUrl = novel?.cover_url?.trim() ?? "";

  let groups: VolumeGroup[] = [];

  if (volumes.length > 0) {
    groups = volumes.map((volume) => ({
      key: `volume-${volume.id}`,
      title: volume.title,
      order: volume.volume_order,
      chapters: chapters
        .filter((chapter) => chapter.volume_id === volume.id)
        .sort((a, b) => a.chapter_number - b.chapter_number),
    }));

    const ungrouped = chapters.filter(
      (chapter) =>
        chapter.volume_id == null ||
        !volumes.some((v) => v.id === chapter.volume_id),
    );

    if (ungrouped.length > 0) {
      groups.push({
        key: "volume-ungrouped",
        title: "未分卷",
        order: Number.MAX_SAFE_INTEGER,
        chapters: ungrouped.sort((a, b) => a.chapter_number - b.chapter_number),
      });
    }
  } else {
    groups = [
      {
        key: "volume-default",
        title: "正文目录",
        order: 1,
        chapters: [...chapters].sort(
          (a, b) => a.chapter_number - b.chapter_number,
        ),
      },
    ];
  }

  const firstChapter = groups.flatMap((g) => g.chapters)[0] ?? null;

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#1f1f1f]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[#666] hover:text-[#bf2c24]"
        >
          ← 返回书架
        </Link>

        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
          <section className="rounded-xl border border-[#e7e7e7] bg-white px-5 py-6 sm:px-6">
            <div className="flex flex-col gap-5 sm:flex-row">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={`${novelTitle} 封面`}
                  className="h-[188px] w-[138px] flex-none rounded-md border border-[#ececec] object-cover"
                />
              ) : (
                <div className="h-[188px] w-[138px] flex-none rounded-md bg-gradient-to-b from-[#e6e6e6] to-[#d8d8d8]" />
              )}

              <div>
                <h1 className="text-3xl font-bold leading-tight">
                  《{novelTitle}》
                </h1>
                <p className="mt-3 text-sm text-[#666]">作者：{novelAuthor}</p>
                <p className="mt-5 text-[15px] leading-8 text-[#555]">
                  {novelDesc}
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-[#efefef] pt-5">
              <h2 className="text-xl font-semibold">目录</h2>
              <p className="mt-1 text-sm text-[#888]">
                共 {chapters.length} 章
              </p>
            </div>

            {chapters.length === 0 ? (
              <p className="mt-6 text-sm text-[#888]">
                暂无章节，去 Supabase 添加后会自动显示。
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {groups
                  .sort((a, b) => a.order - b.order)
                  .map((group) => (
                    <section
                      key={group.key}
                      className="rounded-lg border border-[#f0f0f0]"
                    >
                      <header className="border-b border-[#f3f3f3] bg-[#fafafa] px-4 py-3 text-sm font-semibold text-[#555]">
                        {group.title}
                      </header>

                      {group.chapters.length === 0 ? (
                        <p className="px-4 py-3 text-sm text-[#999]">
                          本卷暂未发布章节
                        </p>
                      ) : (
                        <ul className="divide-y divide-[#f1f1f1]">
                          {group.chapters.map((chapter) => (
                            <li key={chapter.id}>
                              <Link
                                href={`/novel/${novelId}/read/${chapter.chapter_number}`}
                                className="flex items-center justify-between px-4 py-3 transition hover:bg-[#fafafa]"
                              >
                                <span className="text-[15px] text-[#333]">
                                  {chapter.title}
                                </span>
                                <span className="text-xs text-[#999]">
                                  第 {chapter.chapter_number} 章
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
              </div>
            )}
          </section>

          <aside className="rounded-xl border border-[#e7e7e7] bg-white p-5">
            <h3 className="text-base font-semibold">作品信息</h3>
            <dl className="mt-4 space-y-3 text-sm text-[#666]">
              <div className="flex justify-between gap-3">
                <dt>作品 ID</dt>
                <dd className="text-[#333]">{novelId}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>分卷数</dt>
                <dd className="text-[#333]">
                  {volumes.length > 0 ? volumes.length : 1}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>章节数</dt>
                <dd className="text-[#333]">{chapters.length}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>阅读状态</dt>
                <dd className="text-[#333]">未知</dd>
              </div>
            </dl>

            {firstChapter ? (
              <Link
                href={`/novel/${novelId}/read/${firstChapter.chapter_number}`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[#bf2c24] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#a8261f]"
              >
                开始阅读
              </Link>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
