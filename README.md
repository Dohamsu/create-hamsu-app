# create-hamsu-app

🚀 **Next.js 14 + React 18 + MUI v6 + Emotion SSR** 기반의 웹 애플리케이션 스캐폴딩 CLI 도구입니다.

## ✨ 주요 특징

- **Next.js 14** - 최신 App Router와 서버 컴포넌트 지원
- **React 18** - 최신 React 기능과 동시성 렌더링
- **MUI v6** - Material Design 기반의 완성도 높은 UI 컴포넌트
- **Emotion SSR** - 서버 사이드 렌더링을 위한 스타일링 솔루션
- **TypeScript** - 타입 안전성과 개발자 경험 향상
- **관리자 패널** - `(public)`과 `(admin)` 라우트 구조로 분리된 템플릿

## 🚀 빠른 시작

### 1. CLI 도구 설치

```bash
npm install -g create-hamsu-app
```

### 2. 프로젝트 생성

```bash
create-hamsu-app
```

프로젝트 이름을 입력하면 자동으로 모든 설정이 완료됩니다.

### 3. 프로젝트 실행

```bash
cd [프로젝트명]
npm run dev
```

## 🏗️ 프로젝트 구조

```
[프로젝트명]/
├── app/
│   ├── (public)/          # 공개 페이지
│   │   └── page.tsx      # 랜딩 페이지
│   ├── (admin)/          # 관리자 페이지
│   │   ├── admin/
│   │   │   ├── layout.tsx # 관리자 레이아웃
│   │   │   ├── page.tsx   # 대시보드
│   │   │   ├── posts/     # 게시물 관리
│   │   │   └── users/     # 사용자 관리
│   │   └── layout.tsx
│   ├── globals.css
│   └── layout.tsx        # 루트 레이아웃
├── components/
│   ├── MUIThemeRegistry.tsx # MUI 테마 레지스트리
│   └── AdminSidebar.tsx     # 관리자 사이드바
├── theme.ts               # MUI 테마 설정
└── tsconfig.json         # TypeScript 설정
```

## 📦 포함된 라이브러리

### 핵심 프레임워크
- `next@14.2.0` - Next.js 14
- `react@18.2.0` - React 18
- `react-dom@18.2.0` - React DOM

### UI & 스타일링
- `@mui/material@^6` - Material-UI v6
- `@mui/icons-material@^6` - Material 아이콘
- `@emotion/react@^11` - Emotion React
- `@emotion/styled@^11` - Emotion Styled

### 폼 & 검증
- `react-hook-form` - 폼 상태 관리
- `zod` - 스키마 검증
- `@hookform/resolvers` - React Hook Form + Zod 연동

### 데이터 관리
- `@tanstack/react-query` - 서버 상태 관리
- `zustand` - 클라이언트 상태 관리
- `axios` - HTTP 클라이언트

### MUI 확장 컴포넌트
- `@mui/x-data-grid` - 데이터 그리드
- `@mui/x-date-pickers` - 날짜 선택기

### 인증 & SEO
- `next-auth` - 인증 시스템
- `next-seo` - SEO 최적화
- `next-sitemap` - 사이트맵 생성

### 개발 도구
- `eslint` - 코드 품질
- `prettier` - 코드 포맷팅
- `vitest` - 테스트 프레임워크
- `@testing-library/react` - React 테스트

## 🎨 MUI 테마 설정

프로젝트에는 CSS 변수를 활용한 다크/라이트 모드 지원과 한국어 폰트가 포함된 MUI 테마가 미리 설정되어 있습니다.

```typescript
// theme.ts
const theme = createTheme({
  cssVariables: true,
  colorSchemes: { light: true, dark: true },
  typography: {
    fontFamily: ['Inter', 'Pretendard', 'system-ui', 'sans-serif'].join(','),
  },
  components: {
    MuiButton: { defaultProps: { variant: 'contained' } },
  },
});
```

## 🔧 TypeScript 설정

`@/*` 경로 별칭이 자동으로 설정되어 있어 컴포넌트 import가 간편합니다.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 📱 반응형 디자인

MUI의 Grid 시스템과 반응형 컴포넌트를 활용하여 모든 디바이스에서 최적화된 사용자 경험을 제공합니다.

## 🚀 배포

### Vercel (권장)
```bash
npm run build
vercel --prod
```

### 기타 플랫폼
```bash
npm run build
npm start
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원

문제가 있거나 질문이 있으시면 [Issues](../../issues)를 통해 문의해 주세요.

---
