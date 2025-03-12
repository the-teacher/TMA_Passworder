import fs from 'fs';
import path from 'path';
import {
  resetRouter,
  setActionsPath,
  root,
  get,
  post,
  put,
  patch,
  destroy,
  scope,
  resources,
} from '../../index';
import { buildRoutesSchema } from '../../helpers/buildRoutesSchema';
import {
  authMiddleware,
  addDataMiddleware,
  validateMiddleware,
  loggerMiddleware,
} from '../middlewares';

/**
 * Tests for routes schema generation
 * Verifies:
 * - Complex nested routing documentation
 * - Middleware documentation in schema
 * - Different HTTP methods documentation
 * - Scoped routes representation
 * - Schema file generation and format
 * - Complete routing hierarchy documentation
 */

describe('buildRoutesSchema', () => {
  // Use a test-specific directory for the schema file
  const testDir = path.join(__dirname, 'test_output');
  const schemaPath = path.join(testDir, 'routesSchema.md');

  beforeEach(() => {
    resetRouter();
    setActionsPath(path.join(__dirname, './test_actions'));

    // Create test directory if it doesn't exist
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test files
    // if (fs.existsSync(schemaPath)) {
    //   fs.unlinkSync(schemaPath);
    // }
    // if (fs.existsSync(testDir)) {
    //   fs.rmdirSync(testDir);
    // }
  });

  test('should generate routes schema markdown file with complex nested routing', async () => {
    // Root route with middleware
    root([loggerMiddleware], 'index/index');

    // Basic routes with different HTTP methods
    get('/users', 'users/index');
    post('/users', [validateMiddleware], 'users/create');
    get('/users/:id', 'users/show');
    put('/users/:id', [validateMiddleware, authMiddleware], 'users/update');
    patch('/users/:id/status', [authMiddleware], 'users/update_status');
    destroy('/users/:id', [authMiddleware], 'users/delete');

    // Admin scope with middleware
    scope('admin', [authMiddleware], () => {
      get('dashboard', 'admin/dashboard');
      post('settings', 'admin/settings');

      // Nested resources scope
      scope('resources', [loggerMiddleware], () => {
        get('stats', 'admin/resources/stats');
        post('upload', [validateMiddleware], 'admin/resources/upload');
      });
    });

    // API scope with multiple nested levels and middleware combinations
    scope('api', [loggerMiddleware], () => {
      get('status', 'api/status');
      get('health', 'api/health');

      scope('v1', [authMiddleware], () => {
        get('users', 'api/v1/users/list');
        post('users', [validateMiddleware], 'api/v1/users/create');

        scope('admin', [addDataMiddleware], () => {
          get('dashboard', 'api/v1/admin/dashboard');
          post('settings', 'api/v1/admin/settings');

          // Deep nested scope with multiple middleware
          scope('system', [validateMiddleware], () => {
            get('logs', 'api/v1/admin/system/logs');
            post('backup', 'api/v1/admin/system/backup');
          });
        });
      });

      scope('v2', [authMiddleware, validateMiddleware], () => {
        get('users', 'api/v2/users/list');
        post('users/batch', 'api/v2/users/batch_create');

        scope('analytics', [addDataMiddleware], () => {
          get('reports', 'api/v2/analytics/reports');
          get('metrics', 'api/v2/analytics/metrics');
        });
      });
    });

    // Pass the test directory path to buildRoutesSchema
    await buildRoutesSchema(testDir);

    // Verify file exists
    expect(fs.existsSync(schemaPath)).toBe(true);

    // Read and verify content
    const content = fs.readFileSync(schemaPath, 'utf8');

    // Verify table header
    expect(content).toContain('| Method | Path | Action | Middlewares |');

    // Verify root and basic routes
    expect(content).toContain('| GET | / | index/index | 1 middleware(s) |');
    expect(content).toContain('| GET | /users | users/index | none |');
    expect(content).toContain('| POST | /users | users/create | 1 middleware(s) |');
    expect(content).toContain('| PUT | /users/:id | users/update | 2 middleware(s) |');

    // Verify admin routes
    expect(content).toContain('| GET | /admin/dashboard | admin/dashboard | 1 middleware(s) |');
    expect(content).toContain(
      '| GET | /admin/resources/stats | admin/resources/stats | 2 middleware(s) |',
    );

    // Verify API v1 routes
    expect(content).toContain('| GET | /api/v1/users | api/v1/users/list | 2 middleware(s) |');
    expect(content).toContain(
      '| GET | /api/v1/admin/dashboard | api/v1/admin/dashboard | 3 middleware(s) |',
    );
    expect(content).toContain(
      '| GET | /api/v1/admin/system/logs | api/v1/admin/system/logs | 4 middleware(s) |',
    );

    // Verify API v2 routes
    expect(content).toContain('| GET | /api/v2/users | api/v2/users/list | 3 middleware(s) |');
    expect(content).toContain(
      '| GET | /api/v2/analytics/reports | api/v2/analytics/reports | 4 middleware(s) |',
    );
  });

  test('should generate schema for RESTful resources routes', async () => {
    // Create RESTful resources for users
    resources('users', [authMiddleware]);

    // Pass the test directory path to buildRoutesSchema
    await buildRoutesSchema(testDir);

    // Verify file exists
    expect(fs.existsSync(schemaPath)).toBe(true);

    // Read and verify content
    const content = fs.readFileSync(schemaPath, 'utf8');

    // Verify all RESTful routes are documented
    expect(content).toContain('| GET | /users | users/index | 1 middleware(s) |');
    expect(content).toContain('| GET | /users/new | users/new | 1 middleware(s) |');
    expect(content).toContain('| POST | /users | users/create | 1 middleware(s) |');
    expect(content).toContain('| GET | /users/:id | users/show | 1 middleware(s) |');
    expect(content).toContain('| GET | /users/:id/edit | users/edit | 1 middleware(s) |');
    expect(content).toContain('| PUT | /users/:id | users/update | 1 middleware(s) |');
    expect(content).toContain('| PATCH | /users/:id | users/update | 1 middleware(s) |');
    expect(content).toContain('| DELETE | /users/:id | users/destroy | 1 middleware(s) |');
  });

  test('should generate schema for scoped resources with options', async () => {
    // Create scoped resources with options
    scope('admin', [authMiddleware], () => {
      resources('posts', [validateMiddleware], { only: ['index', 'show', 'create'] });
    });

    // Pass the test directory path to buildRoutesSchema
    await buildRoutesSchema(testDir);

    // Verify file exists
    expect(fs.existsSync(schemaPath)).toBe(true);

    // Read and verify content
    const content = fs.readFileSync(schemaPath, 'utf8');

    // Verify only the specified routes are documented
    expect(content).toContain('| GET | /admin/posts | posts/index | 2 middleware(s) |');
    expect(content).toContain('| POST | /admin/posts | posts/create | 2 middleware(s) |');
    expect(content).toContain('| GET | /admin/posts/:id | posts/show | 2 middleware(s) |');

    // Verify excluded routes are not documented
    expect(content).not.toContain('| GET | /admin/posts/new | posts/new |');
    expect(content).not.toContain('| GET | /admin/posts/:id/edit | posts/edit |');
    expect(content).not.toContain('| PUT | /admin/posts/:id | posts/update |');
    expect(content).not.toContain('| DELETE | /admin/posts/:id | posts/destroy |');
  });
});
