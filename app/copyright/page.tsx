import Link from "next/link";

export const metadata = {
  title: "版权声明 | SleepyHorrorWilliam",
  description: "作品版权声明（All Rights Reserved）",
};

export default function CopyrightPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#1f1f1f]">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <Link href="/" className="text-sm text-[#666] hover:text-[#bf2c24]">
          ← 返回首页
        </Link>

        <article className="mt-4 rounded-xl border border-[#e7e7e7] bg-white px-6 py-8 sm:px-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            版权声明（All Rights Reserved）
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#555]">
            本站作品及相关内容（包括但不限于正文、角色、设定、世界观、封面、插图、视觉元素、音视频衍生内容等）均受著作权法及相关法律保护，
            版权所有，保留一切权利。
          </p>

          <section className="mt-6 space-y-3 text-sm leading-7 text-[#555]">
            <p>
              未经权利人事先书面许可，任何组织或个人不得以任何形式对上述内容进行复制、转载、传播、改编、翻译、出版、发行、商业展示或其他利用。
            </p>
            <p>
              本站不因内容公开展示而授予任何默示许可。所有未明确授予的权利，均由权利人保留。
            </p>
          </section>

          <section className="mt-8 rounded-lg bg-[#fafafa] px-4 py-4 text-sm text-[#555]">
            <p className="font-semibold text-[#333]">商务授权联系</p>
            <p className="mt-2">
              如需出版、影视改编、有声改编、游戏改编、衍生商品或其他商业合作授权，请联系：
            </p>
            <p className="mt-1">3687571152@qq.com</p>
          </section>

          <p className="mt-6 text-sm text-[#666]">
            非商业同人创作规则请参见
            <Link
              href="/fanworks-policy"
              className="mx-1 text-[#bf2c24] hover:underline"
            >
              同人二创政策
            </Link>
            页面。
          </p>
        </article>
      </div>
    </main>
  );
}
