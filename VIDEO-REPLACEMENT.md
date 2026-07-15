# Hero video replacement

현재 `assets/video/hero-placeholder.mp4`는 기존 고기 사진으로 만든 임시 6초 루프 영상입니다.

Higgsfield 영상이 완성되면:

1. 파일명을 `hero-final.mp4`로 저장합니다.
2. `assets/video/` 폴더에 넣습니다.
3. 루트 `index.html`과 `ko/index.html`의 `<source>` 경로를 `hero-final.mp4`로 변경합니다.
4. 권장 규격: 1920×1080 또는 1280×720, 6~8초, 무음, H.264 MP4, 6MB 이하.
5. 화면 전체 배경으로 사용되므로 중요한 피사체는 중앙~왼쪽에 두고, 오른쪽은 로고와 문구가 읽히도록 어둡고 단순하게 유지합니다.

첫 화면 글자 애니메이션은 CSS의 `.reveal-fire` 및 `@keyframes fire-rise`에서 조절합니다. `prefers-reduced-motion` 사용자는 애니메이션 없이 즉시 표시됩니다.
