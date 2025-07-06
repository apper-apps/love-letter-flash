import timelineEvents from '@/services/mockData/timelineEvents.json';

const timelineService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...timelineEvents];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const event = timelineEvents.find(e => e.Id === parseInt(id));
    if (!event) {
      throw new Error('Timeline event not found');
    }
    return { ...event };
  },

  create: async (eventData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newEvent = {
      Id: Math.max(...timelineEvents.map(e => e.Id)) + 1,
      ...eventData,
    };
    timelineEvents.push(newEvent);
    return { ...newEvent };
  },

  update: async (id, eventData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = timelineEvents.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Timeline event not found');
    }
    timelineEvents[index] = { ...timelineEvents[index], ...eventData };
    return { ...timelineEvents[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = timelineEvents.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Timeline event not found');
    }
    const deletedEvent = timelineEvents.splice(index, 1)[0];
    return { ...deletedEvent };
  },
};

export default timelineService;