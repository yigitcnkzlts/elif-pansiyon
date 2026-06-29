import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inventoryPath = join(__dirname, '..', 'data', 'rooms-inventory.json');

export function loadInventory() {
  return JSON.parse(readFileSync(inventoryPath, 'utf-8'));
}

export function enrichRoomTypes(roomTypes) {
  const inventory = loadInventory();

  return roomTypes.map((roomType) => {
    const units = inventory.filter((u) => u.roomTypeId === roomType.id);
    const total = units.length;
    const occupied = units.filter((u) => u.status === 'occupied').length;
    const available = total - occupied;

    return {
      ...roomType,
      total,
      occupied,
      available,
      isAvailable: available > 0,
      availabilityStatus: available > 0 ? 'available' : 'full',
    };
  });
}

export function getAvailabilitySummary(roomTypes) {
  const enriched = enrichRoomTypes(roomTypes);
  const totalRooms = enriched.reduce((sum, r) => sum + r.total, 0);
  const occupiedRooms = enriched.reduce((sum, r) => sum + r.occupied, 0);
  const availableRooms = totalRooms - occupiedRooms;

  return {
    totalRooms,
    occupiedRooms,
    availableRooms,
    occupancyRate: totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
    roomTypes: enriched,
  };
}
