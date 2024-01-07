const esbuild = require('esbuild');
const { copy } = require('esbuild-plugin-copy');
const liveServer = require('alive-server');
const fs = require('fs');
const DotEnv = require('dotenv');

DotEnv.config();

let server: any;

const buildProject = () => {
     esbuild.build({
      entryPoints: ['src/index.ts', 'index.html'],
      chunkNames: 'chunks/[name]-[hash]',
      outdir: 'dist',
      bundle: true,
      allowOverwrite: true,
      plugins: [
        copy({
          assets: [
            { from: './src/images/*', to: './' },
            { from: './src/secure', to: './secure' },
          ],
          watch: true,
        }),
      ],
      write: true,
      loader: {
        '.html': 'copy',
        '.css': 'css',
        '.png': 'file',
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env': JSON.stringify(process.env),
      },
    });
};
const serveProject = async() => {
     const ctx = await esbuild.context({
      entryPoints: ['src/index.ts', 'index.html'],
      chunkNames: 'chunks/[name]-[hash]',
      outdir: 'dist',
      bundle: true,
      allowOverwrite: true,
      plugins: [
        copy({
          assets: [
            { from: './src/images/*', to: './' },
            { from: './src/secure', to: './secure' },
          ],
          watch: true,
        }),
      ],
      write: true,
      loader: {
        '.html': 'copy',
        '.css': 'css',
        '.png': 'file',
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env': JSON.stringify(process.env),
      },
    });
    ctx.watch()
};

const startServer = () => {
  const serverParams = {
    root: 'dist',
    port: 4500,
    host: 'localhost',
    file: 'index.html',
    https: {
      cert: fs.readFileSync('./server.cert'),
      key: fs.readFileSync('./server.key'),
      passphrase: '12345',
    },
  };
  liveServer.start(serverParams);
  console.log(`Server is running at https://localhost:${serverParams.port}/`);
};

const startProject = async () => {
  await serveProject();
  startServer();
};
const buildOnly = async () => {
  return buildProject();
};

const stopServer = () => {
  if (server) {
    console.log('Stopping server...');
    liveServer.stop();
    console.log('Server stopped.');
  }
};

process.on('SIGINT', () => {
  stopServer();
  process.exit();
});

const hasBuildArg = process.argv.includes('-build');

if (hasBuildArg) {
  buildOnly();
} else {
  startProject();
}
