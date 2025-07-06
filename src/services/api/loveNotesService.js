import loveNotes from '@/services/mockData/loveNotes.json';

const loveNotesService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 350));
    return [...loveNotes];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const note = loveNotes.find(n => n.Id === parseInt(id));
    if (!note) {
      throw new Error('Love note not found');
    }
    return { ...note };
  },

  create: async (noteData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newNote = {
      Id: Math.max(...loveNotes.map(n => n.Id)) + 1,
      ...noteData,
    };
    loveNotes.push(newNote);
    return { ...newNote };
  },

  update: async (id, noteData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = loveNotes.findIndex(n => n.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Love note not found');
    }
    loveNotes[index] = { ...loveNotes[index], ...noteData };
    return { ...loveNotes[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = loveNotes.findIndex(n => n.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Love note not found');
    }
    const deletedNote = loveNotes.splice(index, 1)[0];
    return { ...deletedNote };
  },
};

export default loveNotesService;