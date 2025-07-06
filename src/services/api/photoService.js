import photos from '@/services/mockData/photos.json';

const photoService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...photos];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const photo = photos.find(p => p.Id === parseInt(id));
    if (!photo) {
      throw new Error('Photo not found');
    }
    return { ...photo };
  },

  create: async (photoData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newPhoto = {
      Id: Math.max(...photos.map(p => p.Id)) + 1,
      ...photoData,
    };
    photos.push(newPhoto);
    return { ...newPhoto };
  },

  update: async (id, photoData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = photos.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Photo not found');
    }
    photos[index] = { ...photos[index], ...photoData };
    return { ...photos[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = photos.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Photo not found');
    }
    const deletedPhoto = photos.splice(index, 1)[0];
    return { ...deletedPhoto };
  },
};

export default photoService;