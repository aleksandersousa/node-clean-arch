import paths from './paths-exports';
import components from './components-exports';
import schemas from './schemas-exports';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean node api',
    description: 'API do curso do manguinho para realizar enquetes entre programadores',
    version: '1.0.0',
  },
  servers: [{ url: '/api' }],
  tags: [{ name: 'Autenticação' }, { name: 'Enquetes' }],
  paths,
  schemas,
  components,
};
