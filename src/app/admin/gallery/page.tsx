'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface GalleryAlbum {
  id: string;
  title: string;
  slug: string;
  category: 'CAMPUS' | 'EVENT' | 'TECHNICAL' | 'SPORTS' | 'GRADUATION';
  eventDate: string;
  photoCount: number;
  coverImage: string;
  isPublished: boolean;
}

const INITIAL_ALBUMS: GalleryAlbum[] = [
  {
    id: 'ALB-001',
    title: '15th Annual Graduation Day & Convocation Ceremony',
    slug: 'graduation-day-2024',
    category: 'GRADUATION',
    eventDate: '2024-06-18',
    photoCount: 48,
    coverImage: '/images/pace_campus_aerial.png',
    isPublished: true,
  },
  {
    id: 'ALB-002',
    title: 'SRUJANA 2024 — National Level Technical Symposium',
    slug: 'srujana-technical-fest',
    category: 'TECHNICAL',
    eventDate: '2024-03-22',
    photoCount: 64,
    coverImage: '/images/pace_campus_aerial.png',
    isPublished: true,
  },
  {
    id: 'ALB-003',
    title: 'PACE Autonomous Campus Infrastructure & Smart Classrooms',
    slug: 'campus-facilities-tour',
    category: 'CAMPUS',
    eventDate: '2024-01-10',
    photoCount: 36,
    coverImage: '/images/pace_campus_aerial.png',
    isPublished: true,
  },
  {
    id: 'ALB-004',
    title: 'JNTUK Inter-Collegiate Cricket & Athletics Championship',
    slug: 'sports-meet-annual',
    category: 'SPORTS',
    eventDate: '2024-02-14',
    photoCount: 52,
    coverImage: '/images/pace_campus_aerial.png',
    isPublished: true,
  },
  {
    id: 'ALB-005',
    title: 'NSS Blood Donation & Mega Health Camp at Valluru',
    slug: 'nss-social-health-camp',
    category: 'EVENT',
    eventDate: '2024-08-15',
    photoCount: 28,
    coverImage: '/images/pace_campus_aerial.png',
    isPublished: true,
  },
];

export default function AdminGalleryManager() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>(INITIAL_ALBUMS);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'EVENT' as const,
    eventDate: new Date().toISOString().split('T')[0],
    photoCount: 12,
    coverImage: '/images/pace_campus_aerial.png',
    isPublished: true,
  });

  const filtered = useMemo(() => {
    return albums.filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === 'ALL' || a.category === catFilter;
      return matchSearch && matchCat;
    });
  }, [albums, search, catFilter]);

  const totalPhotos = useMemo(() => albums.reduce((acc, a) => acc + a.photoCount, 0), [albums]);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      slug: '',
      category: 'EVENT',
      eventDate: new Date().toISOString().split('T')[0],
      photoCount: 12,
      coverImage: '/images/pace_campus_aerial.png',
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlbum: GalleryAlbum = {
      id: `ALB-${String(albums.length + 1).padStart(3, '0')}`,
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formData.category,
      eventDate: formData.eventDate,
      photoCount: formData.photoCount,
      coverImage: formData.coverImage,
      isPublished: formData.isPublished,
    };
    setAlbums([newAlbum, ...albums]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete album and unpublish associated assets?')) {
      setAlbums(albums.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-amber-50 border-l-4 border-[#E5AD35] p-4 rounded-r-lg flex items-start justify-between shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h4 className="text-sm font-bold text-amber-900">
              Frontend Prototype — Campus Photo Archive & Media Album Manager
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              High-resolution event albums and photographic asset catalogs (3,942 mapped photos). S3/Cloudflare R2 object storage direct upload will be wired in Phase 4/5.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-bold bg-[#E5AD35]/20 text-[#073B60] px-2.5 py-1 rounded-full uppercase tracking-wider">
          Phase 4 UI Spec
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#123D5A]">
            Event Photo Albums & Photographic Archive
          </h1>
          <p className="text-sm text-slate-500">
            Publish photo galleries for convocations, technical symposia, sports festivals, and campus infrastructure tours.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Launching batch asset compression optimizer...')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition"
          >
            🖼️ Batch Optimize
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 text-xs font-bold text-white bg-[#123D5A] hover:bg-[#0B2C43] rounded-lg shadow transition flex items-center gap-1.5"
          >
            <span>+ Create Album</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Indexed Photo Assets</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">3,942</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Fully mapped in Phase 1 audit</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Published Albums</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">204 Events</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">All with dedicated routes</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Media Storage Tier</div>
          <div className="text-2xl font-bold text-[#E5AD35] mt-1">4.2 GB</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Lossless WebP optimized</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Galleries</div>
          <div className="text-2xl font-bold text-[#123D5A] mt-1">100% Live</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Lightbox & zoom enabled</div>
        </div>
      </div>

      {/* Filter and Grid */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search albums..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123D5A]/20"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'GRADUATION', 'TECHNICAL', 'SPORTS', 'CAMPUS', 'EVENT'].map((c) => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                catFilter === c
                  ? 'bg-[#123D5A] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Albums */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((album) => (
          <div
            key={album.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition group"
          >
            <div className="h-44 bg-slate-800 relative overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={album.coverImage}
                alt={album.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-amber-300 backdrop-blur-sm">
                  {album.category}
                </span>
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-black/70 text-white backdrop-blur-sm flex items-center gap-1">
                  📷 {album.photoCount} Photos
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] text-slate-400 font-medium mb-1">
                  📅 Event Date: {album.eventDate}
                </div>
                <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-[#123D5A] transition line-clamp-2">
                  {album.title}
                </h3>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live on Web
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/events-gallery/${album.slug}`}
                    target="_blank"
                    className="text-slate-500 hover:text-[#123D5A] font-semibold"
                  >
                    View ↗
                  </Link>
                  <button
                    onClick={() => handleDelete(album.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-[#123D5A]">Create Photo Album</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Album Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. National Engineers Day Celebrations 2024"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="EVENT">Institutional Event</option>
                    <option value="TECHNICAL">Technical Fest</option>
                    <option value="SPORTS">Sports & Athletics</option>
                    <option value="GRADUATION">Graduation Day</option>
                    <option value="CAMPUS">Campus Infrastructure</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date of Event</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50">
                <div className="text-2xl mb-1">📸</div>
                <div className="font-bold text-slate-700">Drop high-res photos here or click to browse</div>
                <p className="text-[11px] text-slate-400 mt-1">Supports JPEG, PNG, WEBP up to 25MB each (Batch uploads supported)</p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#123D5A] hover:bg-[#0B2C43] text-white font-bold rounded-lg shadow"
                >
                  Create Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
