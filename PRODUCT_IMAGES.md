# 제품 이미지 다운로드 가이드

## 현재 상황

`js/data.js`에 7개 제품이 정의되어 있으며 다음 이미지 파일들이 필요합니다:

### 필요한 이미지 파일

**제품 썸네일 (600x800 권장):**
- `assets/images/product01_01.jpg` - 클로턴 다이어리
- `assets/images/product01_02.jpg` - 듀넬 다이어리
- `assets/images/product01_03.jpg` - 크록엣지 가죽 다이어리
- `assets/images/product01_04.jpg` - 사피아노A 시크릿 카드포켓
- `assets/images/product01_05.jpg` - 나비 베이직 다이어리
- `assets/images/product01_06.jpg` - 다용도 펄 블라썸 지갑
- `assets/images/product01_07.jpg` - 다용도 라인 나비 지갑

**상세 이미지 (1200x1600 권장):**
- `assets/images/detail_01.jpg` - 클로턴 다이어리 상세
- `assets/images/detail_02.jpg` - 듀넬 다이어리 상세

---

## 이미지 준비 방법

### 옵션 1: 기존 사이트에서 이미지 다운로드
1. `http://woorimiracle.com` 방문
2. 제품 이미지를 수동으로 다운로드
3. 위의 파일명으로 `assets/images/` 폴더에 저장

### 옵션 2: 새 이미지 준비
실제 제품 사진을 촬영하거나 준비하여 위의 경로에 저장

### 옵션 3: 임시 테스트용 (프로토타입)
개발/테스트를 위해 임시 이미지를 사용하려면 아래 스크립트 실행:

```bash
cd /Users/lab/Desktop/Worktemp/woorimiracle-renewal

# Python으로 간단한 컬러 이미지 생성
python3 << 'EOF'
from PIL import Image, ImageDraw, ImageFont
import os

# 제품 이미지 생성
for i in range(1, 8):
    img = Image.new('RGB', (600, 800), color=(74, 144, 226))
    d = ImageDraw.Draw(img)
    d.text((250, 380), f"Product {i}", fill=(255, 255, 255))
    img.save(f'assets/images/product01_0{i}.jpg')
    print(f"Created product01_0{i}.jpg")

# 상세 이미지 생성
for i in range(1, 3):
    img = Image.new('RGB', (1200, 1600), color=(245, 245, 245))
    d = ImageDraw.Draw(img)
    d.text((500, 780), f"Detail Info {i}", fill=(102, 102, 102))
    img.save(f'assets/images/detail_0{i}.jpg')
    print(f"Created detail_0{i}.jpg")

print("All images created!")
EOF
```

---

## 이미지 최적화 (선택사항)

이미지 준비 후 WebP로 변환하여 용량 60-80% 절감:

```bash
# ImageMagick & WebP 설치
brew install imagemagick webp

# 모든 제품 이미지 WebP 변환
for file in assets/images/product*.jpg; do
    cwebp "$file" -o "${file%.jpg}.webp" -q 85
done

for file in assets/images/detail*.jpg; do
    cwebp "$file" -o "${file%.jpg}.webp" -q 85
done
```

그 후 `data.js`에서 `.jpg` → `.webp` 확장자 변경

---

## 다음 단계

1. 위의 방법 중 하나로 이미지 준비
2. `assets/images/` 폴더에 파일 배치
3. Git에 커밋: `git add assets/images/ && git commit -m "Add product images"`
4. 푸시: `git push origin main`

제품 이미지 파일을 준비해주시면 제가 자동으로 경로를 설정하고 최적화하겠습니다!
