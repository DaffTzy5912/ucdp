import download from 'downloadjs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ message: 'URL tidak ditemukan' });
    }

    try {
      // Mengambil file gambar
      const response = await fetch(url);
      const buffer = await response.buffer();

      // Menggunakan downloadjs untuk mengunduh gambar
      download(buffer, 'image.jpg', 'image/jpeg');
      
      res.status(200).send('Download berhasil');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengunduh gambar' });
    }
  } else {
    res.status(405).json({ message: 'Metode tidak diizinkan' });
  }
}
