import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

/**
 * Resolves the backend package's `data/` directory.
 *
 * We walk up from `__dirname` looking for a directory that contains a
 * `data` folder alongside a `package.json` named "backend". This is robust
 * to both `ts-node-dev` execution (where __dirname is `backend/src/...`)
 * and compiled execution (where __dirname is `backend/dist/...`), unlike
 * relying on `process.cwd()` which depends on where the process was
 * launched from.
 */
function resolveBackendRoot(): string {
  let dir = __dirname;
  for (let i = 0; i < 10; i++) {
    const candidate = path.join(dir, 'data');
    const pkgPath = path.join(dir, 'package.json');
    if (fs.existsSync(candidate) && fs.existsSync(pkgPath)) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  // Fallback: assume the process cwd is the backend package root.
  return process.cwd();
}

export const BACKEND_ROOT = resolveBackendRoot();
export const DATA_DIR = path.join(BACKEND_ROOT, 'data');
export const UPLOADS_DIR = path.join(BACKEND_ROOT, 'uploads');

/**
 * Generic markdown-file-backed repository. Each record is stored as a
 * `.md` file with YAML frontmatter (the record's JSON-serializable fields)
 * and an empty body. Filename = `{id}.md`.
 */
export class MarkdownRepository<T extends { id: string }> {
  private readonly dir: string;

  constructor(collection: string) {
    this.dir = path.join(DATA_DIR, collection);
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir, { recursive: true });
    }
  }

  private filePath(id: string): string {
    return path.join(this.dir, `${id}.md`);
  }

  findAll(): T[] {
    const files = fs.readdirSync(this.dir).filter((f) => f.endsWith('.md'));
    return files.map((f) => {
      const raw = fs.readFileSync(path.join(this.dir, f), 'utf-8');
      const { data } = matter(raw);
      return data as T;
    });
  }

  findById(id: string): T | null {
    const filePath = this.filePath(id);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return data as T;
  }

  save(record: T): T {
    const content = matter.stringify('', record as Record<string, any>);
    fs.writeFileSync(this.filePath(record.id), content, 'utf-8');
    return record;
  }

  delete(id: string): void {
    const filePath = this.filePath(id);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
