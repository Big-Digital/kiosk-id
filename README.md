# kiosk-id

A React component that captures a kiosk ID from the URL, stores it in `localStorage`, and redirects to `/`.

## Installation

```bash
npm install kiosk-id
```

**Peer dependencies:** `react >= 17`, `react-dom >= 17`, `react-router-dom >= 6`

## Usage

```tsx
import { Route, Routes } from 'react-router-dom';
import KioskId from 'kiosk-id';

function App() {
  return (
    <Routes>
      <Route path="/k/:kioskId" element={<KioskId />} />
      {/* other routes */}
    </Routes>
  );
}
```

Visiting `/k/my-kiosk-123` will:
1. Store `"my-kiosk-123"` under the key `kiosk-id` in `localStorage`.
2. Redirect to `/`.

The stored value can be retrieved anywhere with:

```ts
const kioskId = localStorage.getItem('kiosk-id');
```

## Development

```bash
npm run build      # compile to dist/
npm test           # run tests
npm run typecheck  # type-check only
```

<!-- cache check 2026-10-20 -->
