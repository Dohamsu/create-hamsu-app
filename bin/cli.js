#!/usr/bin/env node
import { execa } from 'execa';
import prompts from 'prompts';
import { blue, green, yellow } from 'kolorist';
import path from 'path';
import fs from 'fs';

const write = (filePath, content) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
};

(async () => {
  console.log(blue('🚀 create-hamsu-app – Next14 + React18 + MUI v6 + Emotion SSR'));

  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: '프로젝트 이름을 입력하세요',
    initial: 'my-app'
  });

  if (!projectName) {
    console.error('프로젝트 이름이 필요합니다.');
    process.exit(1);
  }

  const projectPath = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    console.error(yellow('⚠️  이미 해당 이름의 폴더가 존재합니다.'));
    process.exit(1);
  }

  // 1) Next.js 14 템플릿 생성 (TS + npm)
  await execa('npx', ['create-next-app@14', projectName, '--ts', '--use-npm'], { stdio: 'inherit' });

  process.chdir(projectPath);

  // 2) 코어 버전 고정 (React 18 + Next 14.2)
  await execa('npm', ['install', 'react@18.2.0', 'react-dom@18.2.0', 'next@14.2.0'], { stdio: 'inherit' });

  // 3) MUI v6 + Emotion
  await execa('npm', ['install', '@mui/material@^6', '@mui/icons-material@^6', '@emotion/react@^11', '@emotion/styled@^11'], { stdio: 'inherit' });

  // 4) 추천 라이브러리(런타임)
  await execa('npm', [
    'install',
    'react-hook-form',
    'zod',
    '@hookform/resolvers',
    '@mui/x-data-grid',
    '@mui/x-date-pickers',
    'date-fns',
    '@tanstack/react-query',
    'axios',
    'zustand',
    'next-auth',
    'next-seo',
    'next-sitemap'
  ], { stdio: 'inherit' });

  // 5) 개발/품질/테스트 도구
  await execa('npm', [
    'install', '-D',
    'eslint',
    'eslint-config-next',
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin',
    'prettier',
    'vitest',
    '@testing-library/react',
    '@testing-library/jest-dom',
    'jsdom'
  ], { stdio: 'inherit' });

  // 6) 템플릿 파일 생성: Emotion SSR + MUI Theme + (public)/(admin) 샘플
  // components/MUIThemeRegistry.tsx
  write(path.join(projectPath, 'components/MUIThemeRegistry.tsx'), `\
'use client';
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';

export default function MUIThemeRegistry({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo(() => createCache({ key: 'mui', prepend: true }), []);
  useServerInsertedHTML(() => (
    <style
      data-emotion={\`\${cache.key} \${Object.keys((cache as any).inserted).join(' ')}\`}
      dangerouslySetInnerHTML={{ __html: '' }}
    />
  ));
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
`);

  // theme.ts
  write(path.join(projectPath, 'theme.ts'), `\
import { createTheme } from '@mui/material/styles';

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

export default theme;
`);

  // app/layout.tsx (글로벌 Provider 적용)
  write(path.join(projectPath, 'app/layout.tsx'), `\
import type { Metadata } from 'next';
import { ThemeProvider, CssBaseline } from '@mui/material';
import MUIThemeRegistry from '@/components/MUIThemeRegistry';
import theme from '@/theme';
import './globals.css';

export const metadata: Metadata = {
  title: '회사 소개',
  description: '우리 회사 소개 사이트',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <MUIThemeRegistry>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </MUIThemeRegistry>
      </body>
    </html>
  );
}
`);

  // app/(public)/page.tsx (랜딩)
  write(path.join(projectPath, 'app/(public)/page.tsx'), `\
'use client';
import { Box, Container, Typography, Button, Stack } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box py={10}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          우리 회사
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          고객과 함께 성장하는 파트너
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button href="/(admin)/admin" variant="contained">관리자</Button>
          <Button href="#contact" variant="outlined">문의하기</Button>
        </Stack>
      </Box>
    </Container>
  );
}
`);

  // components/AdminSidebar.tsx
  write(path.join(projectPath, 'components/AdminSidebar.tsx'), `\
'use client';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <Box width={240} borderRight="1px solid rgba(0,0,0,0.08)" height="100vh" position="sticky" top={0}>
      <List>
        <ListItemButton component={Link} href="/(admin)/admin">
          <ListItemText primary="대시보드" />
        </ListItemButton>
        <ListItemButton component={Link} href="/(admin)/admin/posts">
          <ListItemText primary="게시물" />
        </ListItemButton>
        <ListItemButton component={Link} href="/(admin)/admin/users">
          <ListItemText primary="사용자" />
        </ListItemButton>
      </List>
    </Box>
  );
}
`);

  // app/(admin)/admin/layout.tsx
  write(path.join(projectPath, 'app/(admin)/admin/layout.tsx'), `\
'use client';
import { Box } from '@mui/material';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex">
      <AdminSidebar />
      <Box flex={1} p={3}>{children}</Box>
    </Box>
  );
}
`);

  // app/(admin)/admin/page.tsx (간단 대시보드 카드)
  write(path.join(projectPath, 'app/(admin)/admin/page.tsx'), `\
'use client';
import { Card, CardContent, Typography, Unstable_Grid2 as Grid } from '@mui/material';

export default function AdminDashboard() {
  return (
    <Grid container spacing={2}>
      {['방문자', '문의', '게시물'].map((k) => (
        <Grid key={k} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{k}</Typography>
              <Typography variant="h4" fontWeight={700}>0</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
`);

  // tsconfig 경로 alias(@/*) 보장 – create-next-app 기본값 유지 확인/보정
  const tsconfigPath = path.join(projectPath, 'tsconfig.json');
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || { '@/*': ['./*'] };
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

  console.log(green(`\n✅ ${projectName} 프로젝트 생성 완료!`));
  console.log(blue(`\n다음 명령으로 시작하세요:`));
  console.log(`cd ${projectName}`);
  console.log(`npm run dev`);
})();
