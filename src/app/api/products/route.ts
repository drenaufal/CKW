import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { serverStore } from '@/lib/serverStore';
import { ProductItem } from '@/services/dataStorage';

/**
 * GET: Mengambil daftar produk (Publik)
 */
export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM products ORDER BY sort_order ASC, id ASC');
    if (rows && rows.length > 0) {
      const formatted: ProductItem[] = rows.map((r) => ({
        id: r.id,
        name_id: r.name_id,
        name_en: r.name_en,
        slug: r.slug,
        shortDescription_id: r.short_description_id || '',
        shortDescription_en: r.short_description_en || '',
        description_id: r.description_id || '',
        description_en: r.description_en || '',
        chemicalComposition_id: r.chemical_composition_id || '',
        chemicalComposition_en: r.chemical_composition_en || '',
        particleSize_id: r.particle_size_id || '',
        particleSize_en: r.particle_size_en || '',
        moistureContent_id: r.moisture_content_id || '',
        moistureContent_en: r.moisture_content_en || '',
        cleanliness_id: r.cleanliness_id || '',
        cleanliness_en: r.cleanliness_en || '',
        packagingRequirement_id: r.packaging_requirement_id || '',
        packagingRequirement_en: r.packaging_requirement_en || '',
        imageUrl: r.image_url || '',
        status: r.status,
        featured: Boolean(r.featured),
        sortOrder: r.sort_order || 0,
        assaySiO2: r.assay_sio2,
        assayFe2O3: r.assay_fe2o3,
        assayAl2O3: r.assay_al2o3,
        assayTiO2: r.assay_tio2,
        assayLOI: r.assay_loi,
        afsFineness: r.afs_fineness,
        mohsHardness: r.mohs_hardness,
        specificGravity: r.specific_gravity,
        bulkDensity: r.bulk_density,
        phValue: r.ph_value,
      }));
      return NextResponse.json({ success: true, products: formatted });
    }
  } catch (error) {
    // Database offline - gunakan data serverStore
  }

  return NextResponse.json({ success: true, products: serverStore.products });
}

/**
 * POST: Tambah produk baru (Hanya Admin)
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Autentikasi admin diperlukan.' }, { status: 401 });
  }

  try {
    const body: ProductItem = await request.json();
    const newProduct: ProductItem = {
      ...body,
      id: body.id || Date.now(),
    };

    serverStore.products = [newProduct, ...serverStore.products];

    try {
      await query(
        `INSERT INTO products (name_id, name_en, slug, short_description_id, short_description_en, description_id, description_en, chemical_composition_id, chemical_composition_en, particle_size_id, particle_size_en, moisture_content_id, cleanliness_id, packaging_requirement_id, image_url, status, featured, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newProduct.name_id,
          newProduct.name_en || newProduct.name_id,
          newProduct.slug || `silica-${Date.now()}`,
          newProduct.shortDescription_id,
          newProduct.shortDescription_en || '',
          newProduct.description_id,
          newProduct.description_en || '',
          newProduct.chemicalComposition_id,
          newProduct.chemicalComposition_en || '',
          newProduct.particleSize_id,
          newProduct.particleSize_en || '',
          newProduct.moistureContent_id || '',
          newProduct.cleanliness_id || '',
          newProduct.packagingRequirement_id || '',
          newProduct.imageUrl || '',
          newProduct.status || 'published',
          newProduct.featured ? 1 : 0,
          newProduct.sortOrder || 0,
        ]
      );
    } catch {}

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
  }
}

/**
 * PUT: Perbarui status / data produk (Hanya Admin)
 */
export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Autentikasi admin diperlukan.' }, { status: 401 });
  }

  try {
    const updatedProduct: ProductItem = await request.json();
    serverStore.products = serverStore.products.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p));

    try {
      await query(
        `UPDATE products SET status = ?, featured = ?, sort_order = ?, updated_at = NOW() WHERE id = ?`,
        [updatedProduct.status, updatedProduct.featured ? 1 : 0, updatedProduct.sortOrder || 0, updatedProduct.id]
      );
    } catch {}

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
  }
}

