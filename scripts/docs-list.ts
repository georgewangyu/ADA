#!/usr/bin/env node

import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const docsDir = join(root, 'docs')

function walk(dir: string, base: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, base, out)
    if (entry.isFile() && entry.name.endsWith('.md')) out.push(relative(base, full))
  }
  return out.sort((a, b) => a.localeCompare(b))
}

function parseFrontMatter(content: string): { summary?: string; readWhen: string[] } {
  if (!content.startsWith('---\n')) return { readWhen: [] }
  const end = content.indexOf('\n---\n', 4)
  if (end < 0) return { readWhen: [] }
  const fm = content.slice(4, end)
  const lines = fm.split('\n')
  const readWhen: string[] = []
  let summary: string | undefined
  let inReadWhen = false

  for (const raw of lines) {
    const line = raw.trim()
    if (line.startsWith('summary:')) {
      summary = line.slice('summary:'.length).trim().replace(/^['"]|['"]$/g, '')
      inReadWhen = false
      continue
    }
    if (line.startsWith('read_when:')) {
      inReadWhen = true
      continue
    }
    if (inReadWhen && line.startsWith('- ')) {
      readWhen.push(line.slice(2).trim())
      continue
    }
    if (line && !line.startsWith('- ')) inReadWhen = false
  }

  return { summary, readWhen }
}

try {
  const files = walk(docsDir, docsDir)
  if (!files.length) {
    console.log('No markdown docs found under docs/.')
    process.exit(0)
  }

  console.log('Docs index:')
  for (const rel of files) {
    const full = join(docsDir, rel)
    const content = readFileSync(full, 'utf8')
    const { summary, readWhen } = parseFrontMatter(content)
    const suffix = summary ? ` - ${summary}` : ''
    console.log(`- ${rel}${suffix}`)
    if (readWhen.length) console.log(`  read_when: ${readWhen.join('; ')}`)
  }
} catch (err) {
  console.error('Failed to list docs:', err)
  process.exit(1)
}
