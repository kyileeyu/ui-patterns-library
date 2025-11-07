import { version as coreVersion } from '@ui-patterns/core'
import { version as reactVersion } from '@ui-patterns/react'

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>UI Patterns Library</h1>
      <p>프레임워크 무관 UI 패턴 구현 & React Wrapper</p>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>패키지 버전</h2>
        <ul>
          <li>@ui-patterns/core: {coreVersion}</li>
          <li>@ui-patterns/react: {reactVersion}</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>구현 예정 패턴</h2>
        <p>Priority Group 1부터 순차적으로 구현됩니다:</p>
        <ol>
          <li>Modal/Dialog</li>
          <li>Alert Dialog</li>
          <li>Drawer/Sheet</li>
          <li>Bottom Sheet</li>
          <li>Popover</li>
          <li>Tooltip</li>
        </ol>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e3f2fd', borderRadius: '8px' }}>
        <p><strong>✅ Monorepo 설정 완료!</strong></p>
        <p>다음 단계: 첫 번째 패턴(Modal) 구현</p>
      </div>
    </div>
  )
}

export default App
