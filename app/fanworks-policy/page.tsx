import Link from "next/link";

export const metadata = {
  title: "同人二创政策 | SleepyHorrorWilliam",
  description: "非商业同人创作许可与禁止事项",
};

export default function FanworksPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#1f1f1f]">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <Link href="/" className="text-sm text-[#666] hover:text-[#bf2c24]">
          ← 返回首页
        </Link>

        <article className="mt-4 rounded-xl border border-[#e7e7e7] bg-white px-6 py-8 sm:px-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            同人二创政策（非商业）
          </h1>
          <p className="mt-3 text-sm text-[#777]">最后更新：2026-03-02</p>

          <section className="mt-6 text-sm leading-7 text-[#555]">
            <p>
              在不影响作者合法权益与后续商业开发的前提下，欢迎读者进行非商业同人创作。
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">
              一、允许范围（无需单独申请）
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#555]">
              <li>仅限非商业用途（不收费、不分成、不接受商业投放）。</li>
              <li>明确标注原作与作者，并注明“非官方、非商业二创”。</li>
              <li>不得冒充官方或暗示与作者存在官方合作关系。</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">
              二、禁止事项（未经书面许可）
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#555]">
              <li>
                任何商业化使用（付费连载、广告变现、赞助分成、带货导流等）。
              </li>
              <li>出版、有声发行、影视/动画/游戏改编、周边售卖等商业开发。</li>
              <li>大规模搬运原文、删除或篡改署名与版权信息。</li>
              <li>将作品用于 AI 训练、微调或数据集构建。</li>
            </ul>
          </section>

          <section className="mt-8 rounded-lg bg-[#fafafa] px-4 py-4 text-sm text-[#555]">
            <p className="font-semibold text-[#333]">作者保留权利</p>
            <p className="mt-2">
              作者保留并独占所有商业化权利，包括但不限于出版权、发行权、改编权（影视/有声/游戏）、衍生商品开发权等。
            </p>
          </section>

          <section className="mt-8 text-sm leading-7 text-[#555]">
            <p>商务授权联系：3687571152@qq.com</p>
            <p className="mt-2">
              总版权规则请参见
              <Link
                href="/copyright"
                className="mx-1 text-[#bf2c24] hover:underline"
              >
                版权声明
              </Link>
              页面。
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
