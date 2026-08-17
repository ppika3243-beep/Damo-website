import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function apiProxyPlugin(): Plugin {
  return {
    name: 'api-proxy-plugin',
    configureServer(server) {
      // Order Submission Proxy
      server.middlewares.use('/api/submit-order', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const targetUrl =
                'https://script.google.com/macros/s/AKfycbyVAzeoR5R3m_1R3_KjdD8ITN5JzfBKSkwv6rgoX3B1V1PAXqua8Bq_wsZT6TzkgybY8g/exec';

              const googleRes = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: body,
                redirect: 'follow',
              });

              const responseText = await googleRes.text();
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  result: 'success',
                  data: responseText,
                })
              );
            } catch (err: unknown) {
              const errMsg = err instanceof Error ? err.message : 'Proxy error';
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: errMsg }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });

      // Remote Order Tracking Proxy
      server.middlewares.use('/api/track-order', async (req, res) => {
        try {
          const parsedUrl = new URL(req.url || '', 'http://localhost:3000');
          const query = parsedUrl.searchParams.get('query') || parsedUrl.searchParams.get('orderId') || '';
          
          if (!query) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Query parameter is required' }));
            return;
          }

          const targetUrl = `https://script.google.com/macros/s/AKfycbyVAzeoR5R3m_1R3_KjdD8ITN5JzfBKSkwv6rgoX3B1V1PAXqua8Bq_wsZT6TzkgybY8g/exec?action=track&query=${encodeURIComponent(query)}&orderId=${encodeURIComponent(query)}`;

          const googleRes = await fetch(targetUrl, {
            method: 'GET',
            redirect: 'follow',
          });

          const dataText = await googleRes.text();
          let parsedData: Record<string, unknown> = {};
          try {
            parsedData = JSON.parse(dataText);
          } catch {
            parsedData = { raw: dataText };
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, data: parsedData }));
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : 'Track proxy error';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: errMsg }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiProxyPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
