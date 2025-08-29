import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CalendarEvent } from "../../components/ui/CustomCalendar";



// Creamos un arreglo inicial de eventos de ejemplo
let mockEvents: CalendarEvent[] = [
  {
    id: 1,
    date: "2025-08-27",
    title: "Sesión de prueba",
    tipo: "Público",
    type: "1",
    scope: "2",
    user: {
      id: 1,
      name: "Alondra Gutiérrez Flores",
      email: "alondra.gutierrez",
      area: {
        id: 3,
        name: "Dirección",
        acronym: "DO",
        email: "dir.orga",
        image: "https://liga/a/imagen.png",
      },
    },
    site: "1",
    consecutivo: "Ord.",
    consecutiva: 1,
  },
];

export function setupMockBackend() {
  const mock = new MockAdapter(axios, { delayResponse: 500 }); // Simula un retraso

  // GET /api/events
  mock.onGet("/api/events/").reply(200, mockEvents);

  // POST /api/events
  mock.onPost("/api/events/").reply((config) => {
    const newEvent: CalendarEvent = {
      id: mockEvents.length + 1,
      ...JSON.parse(config.data),
    };
    mockEvents.push(newEvent);
    return [201, newEvent];
  });

  // PUT /api/events/:id
  mock.onPut(/\/api\/events\/\d+/).reply((config) => {
    const id = Number(config.url?.split("/").pop());
    const index = mockEvents.findIndex((e) => e.id === id);
    if (index === -1) return [404];
    const updatedEvent = { ...mockEvents[index], ...JSON.parse(config.data) };
    mockEvents[index] = updatedEvent;
    return [200, updatedEvent];
  });

  // DELETE /api/events/:id (opcional)
  mock.onDelete(/\/api\/events\/\d+/).reply((config) => {
    const id = Number(config.url?.split("/").pop());
    mockEvents = mockEvents.filter((e) => e.id !== id);
    return [204];
  });
}
