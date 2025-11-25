# 이미지 GitHub 로컬 호스팅 설정

## 폴더 구조
```
assets/
└── images/
    ├── logo/
    │   └── logo.png (또는 logo.webp)
    ├── hero/
    │   ├── hero-1.jpg
    │   └── hero-2.jpg
    └── products/
        ├── product-1.jpg
        ├── product-2.jpg
        └── ...
```

## 이미지 준비 단계

### 1. 기존 이미지 다운로드
현재 사용 중인 외부 이미지들:
- 로고: `http://woorimiracle.com/default/img/plus/logo.gif`
- 히어로: `http://woorimiracle.com/default/img/main/visual_01.jpg`
- 제품: ImgBB 호스팅

**다운로드 방법:**
```bash
# 로고 다운로드
curl -o assets/images/logo/logo.gif "http://woorimiracle.com/default/img/plus/logo.gif"

# 히어로 이미지 다운로드
curl -o assets/images/hero/hero-1.jpg "http://woorimiracle.com/default/img/main/visual_01.jpg"
curl -o assets/images/hero/hero-2.jpg "http://woorimiracle.com/default/img/main/visual_02.jpg"
```

### 2. 이미지 최적화 (선택사항)
WebP 변환으로 50-80% 용량 감소:
```bash
# ImageMagick 설치 (Mac)
brew install imagemagick webp

# 이미지 변환
cwebp assets/images/logo/logo.gif -o assets/images/logo/logo.webp -q 85
```

### 3. 코드 수정
외부 URL을 로컬 경로로 변경:

**변경 전:**
```html
<img src="http://woorimiracle.com/default/img/plus/logo.gif">
```

**변경 후:**
```html
<img src="assets/images/logo/logo.webp" loading="lazy">
```

## Lazy Loading 추가

모든 이미지에 `loading="lazy"` 속성 추가:
- ✅ 첫 화면에 보이지 않는 이미지는 필요할 때만 로드
- ✅ 페이지 로딩 속도 대폭 개선

## GitHub에 커밋

```bash
git add assets/images/
git commit -m "Add local image assets for faster loading"
git push origin main
```

## 예상 효과
- 🚀 **로딩 속도**: 외부 서버 의존 제거, 30-50% 개선
- 📦 **안정성**: 외부 이미지 서버 장애 영향 없음
- 🎯 **캐싱**: 브라우저 캐싱 효율 증가
- 💾 **대역폭**: WebP 사용 시 60-80% 절감

## 다음 단계

1. 위 명령어로 이미지 다운로드
2. 제품 이미지를 `assets/images/products/` 폴더에 추가
3. 외부 URL을 로컬 경로로 변경 (도움 필요시 알려주세요)
4. Git에 커밋 & 푸시
