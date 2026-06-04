export function AboutPageCard() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16">
      <p className="mb-3 font-mono text-subdued text-xs uppercase tracking-[0.18em]">
        About
      </p>
      <h1 className="text-3xl font-semibold text-foreground">
        기록으로 개발을 선명하게 만들기
      </h1>
      <div className="mt-8 space-y-5 text-dim leading-8">
        <p>
          이 Developer Blog는 개발하면서 배운 것, 결정의 이유, 다시 꺼내 보고
          싶은 실험을 MDX Post로 남기는 공간입니다.
        </p>
        <p>
          기본 언어는 한국어이고 TypeScript, React, Next.js 같은 기술 이름은
          그대로 사용합니다. 홈은 소개보다 글을 먼저 보여주는 Post Hub로
          유지합니다.
        </p>
        <p>
          서버 기능 없이 GitHub Pages에 Static Publication으로 배포하며, 글은
          소스 코드 안의 MDX 파일로 관리합니다.
        </p>
      </div>
    </div>
  );
}
