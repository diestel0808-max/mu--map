# mumap-proxy

mu__map의 KOPIS API 프록시 서버 (Vercel 배포용)

## 배포 방법

### 1. Vercel CLI 설치
```bash
npm i -g vercel
```

### 2. 이 폴더에서 배포
```bash
cd mumap-proxy
vercel deploy --prod
```

### 3. 환경변수 설정
Vercel 대시보드 → 프로젝트 → Settings → Environment Variables:
```
KOPIS_API_KEY = 발급받은_KOPIS_API_키
```

또는 CLI:
```bash
vercel env add KOPIS_API_KEY
```

### 4. 배포 URL 확인
배포 완료 후 URL 예시:
```
https://mumap-proxy.vercel.app
```

### 5. mumap.html에 프록시 URL 설정
설정(⚙) → "KOPIS 프록시 URL" 란에 입력:
```
https://mumap-proxy.vercel.app
```

## API 사용 예시

```
GET /api/kopis?path=pblprfr&stdate=20230101&eddate=20231231&shprfnm=오페라의유령&rows=10
GET /api/kopis?path=pblprfr/PF123456  (상세 조회)
```

## 구조

```
mumap-proxy/
├── api/
│   └── kopis.js     # Vercel Serverless Function
├── vercel.json      # Vercel 설정
├── package.json
└── README.md
```
