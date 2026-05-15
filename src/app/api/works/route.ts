import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const worksDir = path.join(process.cwd(), 'public', 'works');
  const categories = ['posters', 'branding', 'ui'];
  
  const results: any = {};

  try {
    categories.forEach(cat => {
      const featuredPath = path.join(worksDir, cat, 'featured');
      
      if (fs.existsSync(featuredPath)) {
        const files = fs.readdirSync(featuredPath)
          .filter(file => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file));
        
        results[cat] = files.map(file => `/works/${cat}/featured/${file}`);
      } else {
        results[cat] = [];
      }
    });

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read images' }, { status: 500 });
  }
}
