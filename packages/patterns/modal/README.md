# Modal Pattern


모달의 구성요소
- 열려는 page
- 그 속의 button
- 버튼 클릭 시 여는 handler
- 열리는 화면


4가지 패턴 비교
패턴	장점	단점	사용 케이스
Declarative	직관적, React다움	state 관리 필요	일반적인 모달
Promise	간결한 호출, async/await	DOM 직접 조작	confirm/alert 대체
Hook	로직 재사용, 깔끔	커스텀 훅 개념 필요	반복되는 모달 패턴
Headless	완전한 커스터마이징	복잡한 구조	디자인 시스템