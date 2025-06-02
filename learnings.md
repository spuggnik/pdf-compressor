Projekt-Setup:
"create-next-app xxx-tools"

- Next 13 App Router legt app/-Ordner an
- npm run dev -> localhost:3000
- Struktur merken: app/**route**/page.tsx = Seite.

Home-Seite anpassen:

- JSX in app/page.tsx ersetzt reines HTML.
- Image aus next/image -> Auto-Optimierung (automatische Bildgrößenanpassung und Bereitstellung in modernen Formaten für bessere Performance)
- Assets in public/ (z.B /logo.png)

File-base Routing

- Neuer Ordner app/compressor/page.tsx -> Route /compressor 
- next/link verknüpft Pages ohne Reload

API-Route

- Datei app/api/hello.route.ts mit export async function GET() liefert JSON.
- Aufruf im Browser: /api/hello.
- Gleicher Code Base -> kein Cross-Origin-Gefrickel

Mini-Nav & Client Hook

- NavBar-Komponente global in app/layout.tsx eingebunden.
- HelloButton als Client Component: 'use client' + useState + fetch('api/hello').
- Hydration Mismatch -> Browser Extension? z.B (Dark Reader) oder suppressHydrationWarning

Client vs Server Component
- Server Component = Standard, läuft nur auf Server, kein Bundle
- client Component braucht 'use Client', darf React-Hooks wie useState und useEffect sowie das globale Browser-Objekt window nutzen, wird im Browser gebundelt.
- Mischregel: Server kann Client-Child importieren, umgekehrt nicht.
  Beispiel:
  ```tsx
  // Server Component (app/server-component.tsx)
  import ClientComponent from './client-component';

  export default function ServerComponent() {
	return (
	  <div>
		<h1>Server Component</h1>
		<ClientComponent />
	  </div>
	);
  }

  // Client Component (app/client-component.tsx)
  'use client';

  export default function ClientComponent() {
	return <button>Client Component Button</button>;
  }
  ```

