import { root, get, post, put, patch, destroy, scope, buildRoutesSchema } from '@libs/the-router';

// root('index/index');
// User routes
// get('/users/exists/:service/:id', 'users/exists');
// post('/users/create', 'users/create');

root('index/index');

scope('passwords', () => {
  get('stats', 'admin/passwords/stats');
  post('upload', 'admin/passwords/upload');
});

// Basic routes with different HTTP methods
get('/users', 'users/index');
post('/users', 'users/create');
get('/users/:id', 'users/show');
put('/users/:id', 'users/update');
patch('/users/:id/status', 'users/update_status');
destroy('/users/:id', 'users/delete');

// Admin scope with middleware
scope('admin', () => {
  get('dashboard', 'admin/dashboard');
  post('settings', 'admin/settings');

  // Nested resources scope
  scope('resources', () => {
    get('stats', 'admin/resources/stats');
    post('upload', 'admin/resources/upload');
  });
});

buildRoutesSchema('src/routes');
