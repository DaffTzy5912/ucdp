// /api/download.js
const axios = require('axios');
const express = require('express');
const app = express();

export default async function handler(req, res) {
  const { url, filename } = req.query;

  if (!url || !filename) {
    return res.status(400).send('URL dan nama file harus disediakan.');
  }

  try {
    // Unduh gambar dari URL
    const response = await axios({
      url,
      responseType: 'arraybuffer',
    });

    // Set header untuk unduhan file
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Kirim file ke klien
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Gagal mengunduh gambar.');
  }
};
