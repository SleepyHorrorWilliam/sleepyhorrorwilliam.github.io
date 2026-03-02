import { supabase } from "@/lib/supabase";
import Link from "next/link";

type ChapterRecord = {
  id: number;
  title: string;
  content: string | null;
  chapter_number: number;
  novels: { title: string } | { title: string }[] | null;
};

type ChapterNavItem = {
  chapter_number: number;
};

const FONT_SIZE_OPTIONS = [19, 21, 23, 25] as const;
const LINE_HEIGHT_OPTIONS = [1.9, 2.1, 2.3] as const;

export default async function ReadPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; num: string }>;
  searchParams: Promise<{ fs?: string; lh?: string }>;
}) {
  const { id, num } = await params;
  const { fs, lh } = await searchParams;

  const novelId = Number(id);
  const chapterNum = Number(num);

  if (Number.isNaN(novelId) || Number.isNaN(chapterNum)) {
    return <div className="p-10 text-center text-[#666]">章节参数无效</div>;
  }

  const selectedFontSize = Number(fs);
  const selectedLineHeight = Number(lh);

  const fontSize = FONT_SIZE_OPTIONS.includes(
    selectedFontSize as (typeof FONT_SIZE_OPTIONS)[number],
  )
    ? selectedFontSize
    : 21;

  const lineHeight = LINE_HEIGHT_OPTIONS.includes(
    selectedLineHeight as (typeof LINE_HEIGHT_OPTIONS)[number],
  )
    ? selectedLineHeight
    : 2.1;

  const [{ data: chapterData }, { data: chapterListData }] = await Promise.all([
    supabase
      .from("chapters")
      .select("id,title,content,chapter_number,novels(title)")
      .eq("novel_id", novelId)
      .eq("chapter_number", chapterNum)
      .maybeSingle(),
    supabase
      .from("chapters")
      .select("chapter_number")
      .eq("novel_id", novelId)
      .order("chapter_number", { ascending: true }),
  ]);

  const chapter = chapterData as ChapterRecord | null;
  const chapterList = (chapterListData ?? []) as ChapterNavItem[];

  if (!chapter) {
    return <div className="p-10 text-center text-[#666]">章节飞走了...</div>;
  }

  const novelTitle = Array.isArray(chapter.novels)
    ? chapter.novels[0]?.title
    : chapter.novels?.title;

  const paragraphs = (chapter.content ?? "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const currentIndex = chapterList.findIndex(
    (item) => item.chapter_number === chapterNum,
  );
  const prevChapter =
    currentIndex > 0 ? chapterList[currentIndex - 1]?.chapter_number : null;
  const nextChapter =
    currentIndex >= 0 && currentIndex < chapterList.length - 1
      ? chapterList[currentIndex + 1]?.chapter_number
      : null;

  const buildReadHref = (targetChapter: number) =>
    `/novel/${novelId}/read/${targetChapter}?fs=${fontSize}&lh=${lineHeight}`;

  return (
    <main className="min-h-screen bg-[#d6d3ce] text-[#1f1f1f]">
      <div className="mx-auto w-full max-w-[980px] px-4 py-4 sm:px-6">
        <div className="rounded-xl border border-[#d8d1c4] bg-[#f2ede4] px-4 py-3 text-sm text-[#6b655c] sm:px-6">
          <Link href="/" className="hover:text-[#bf2c24]">
            书架
          </Link>
          <span className="mx-2 text-[#aaa]">/</span>
          <Link href={`/novel/${novelId}`} className="hover:text-[#bf2c24]">
            《{novelTitle ?? `小说 #${novelId}`}》
          </Link>
          <span className="mx-2 text-[#aaa]">/</span>
          <span className="text-[#888]">正文</span>
        </div>

        <details className="mt-4 rounded-xl border border-[#d8d1c4] bg-[#f2ede4] text-sm text-[#6b655c]">
          <summary className="cursor-pointer list-none px-4 py-3 font-medium hover:text-[#4f493f] sm:px-6 [&::-webkit-details-marker]:hidden">
            设置（字号 / 间距）
          </summary>

          <div className="border-t border-[#e2dacb] px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1">字号</span>
              {FONT_SIZE_OPTIONS.map((size) => (
                <Link
                  key={`fs-${size}`}
                  href={`/novel/${novelId}/read/${chapterNum}?fs=${size}&lh=${lineHeight}`}
                  className={`rounded-md px-3 py-1.5 transition ${
                    size === fontSize
                      ? "bg-[#bf2c24] text-white"
                      : "border border-[#ddd4c7] bg-white text-[#555] hover:border-[#c9bca8]"
                  }`}
                >
                  {size}
                </Link>
              ))}

              <span className="ml-3 mr-1">间距</span>
              {LINE_HEIGHT_OPTIONS.map((lhValue) => (
                <Link
                  key={`lh-${lhValue}`}
                  href={`/novel/${novelId}/read/${chapterNum}?fs=${fontSize}&lh=${lhValue}`}
                  className={`rounded-md px-3 py-1.5 transition ${
                    lhValue === lineHeight
                      ? "bg-[#bf2c24] text-white"
                      : "border border-[#ddd4c7] bg-white text-[#555] hover:border-[#c9bca8]"
                  }`}
                >
                  {lhValue.toFixed(1)}
                </Link>
              ))}
            </div>
          </div>
        </details>

        <article className="mt-4 rounded-xl border border-[#d8d1c4] bg-[#f6f1e6] px-6 py-8 sm:px-10 sm:py-10">
          <header className="mb-8 border-b border-[#e5dece] pb-6 text-center">
            <h1 className="text-[34px] font-bold leading-tight text-[#262626]">
              {chapter.title}
            </h1>
            <p className="mt-3 text-sm text-[#8b8b8b]">
              第 {chapter.chapter_number} 章
            </p>
          </header>

          <section
            className="mx-auto w-full max-w-[760px] text-[#2f2f2f]"
            style={{ fontSize: `${fontSize}px`, lineHeight }}
          >
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p key={`${chapter.id}-${index}`} className="reading-paragraph">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-base text-[#777]">本章暂无正文内容。</p>
            )}
          </section>
        </article>

        <nav className="mt-4 rounded-xl border border-[#d8d1c4] bg-[#f2ede4] p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-3">
            {prevChapter !== null ? (
              <Link
                href={buildReadHref(prevChapter)}
                className="rounded-md border border-[#ddd4c7] bg-white px-4 py-2 text-center text-sm text-[#555] transition hover:border-[#c9bca8] hover:bg-[#faf8f2]"
              >
                上一章
              </Link>
            ) : (
              <span className="rounded-md border border-[#e9e2d5] bg-white px-4 py-2 text-center text-sm text-[#bbb]">
                上一章
              </span>
            )}

            <Link
              href={`/novel/${novelId}`}
              className="rounded-md border border-[#ddd4c7] bg-white px-4 py-2 text-center text-sm text-[#555] transition hover:border-[#c9bca8] hover:bg-[#faf8f2]"
            >
              目录
            </Link>

            {nextChapter !== null ? (
              <Link
                href={buildReadHref(nextChapter)}
                className="rounded-md border border-[#ddd4c7] bg-white px-4 py-2 text-center text-sm text-[#555] transition hover:border-[#c9bca8] hover:bg-[#faf8f2]"
              >
                下一章
              </Link>
            ) : (
              <span className="rounded-md border border-[#e9e2d5] bg-white px-4 py-2 text-center text-sm text-[#bbb]">
                下一章
              </span>
            )}
          </div>
        </nav>
      </div>
    </main>
  );
}
