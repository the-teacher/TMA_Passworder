import fs from 'fs';
import path from 'path';
import { getRoutesMap } from '../route-map';
import { RouteInfo } from '../router-state';
import { getProjectRoot } from '../utils';

export const buildRoutesSchema = async (relativePath: string = 'routes'): Promise<void> => {
  const routesMap = getRoutesMap();
  const projectRoot = getProjectRoot();
  const schemaDir = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(projectRoot, relativePath);
  const schemaPath = path.join(schemaDir, 'routesSchema.md');

  // Create routes directory if it doesn't exist
  if (!fs.existsSync(schemaDir)) {
    fs.mkdirSync(schemaDir, { recursive: true });
  }

  // Generate markdown content
  const content = generateMarkdownSchema(routesMap);

  // Write to file
  fs.writeFileSync(schemaPath, content, 'utf8');
};

const generateMarkdownSchema = (routesMap: Map<string, RouteInfo>): string => {
  const lines: string[] = [
    '# API Routes Schema',
    '',
    '| Method | Path | Action | Middlewares | Middlewares Names |',
    '|--------|------|--------|------------|------------------|',
  ];

  // Sort routes by path for better readability
  const sortedRoutes = Array.from(routesMap.values()).sort((a, b) => {
    return a.path.localeCompare(b.path);
  });

  for (const route of sortedRoutes) {
    // Do not count the last middleware, because it is the system `loadAction`
    const middlewaresCount = route.middlewares.length - 1;

    const middlewaresInfo = middlewaresCount > 0 ? `${middlewaresCount} middleware(s)` : 'none';

    lines.push(
      `| ${route.method} | ${route.path} | ${route.action} | ${middlewaresInfo} | ${route.middlewaresNames.join(', ')} |`,
    );
  }

  return lines.join('\n');
};
