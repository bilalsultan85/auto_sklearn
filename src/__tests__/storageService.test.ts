import { storageService } from '../services/storageService';
import { ServiceConfig } from '../types';

describe('StorageService', () => {
  beforeEach(() => {
    storageService.clearLocalStorage();
  });

  describe('localStorage fallback', () => {
    test('should create and retrieve items', async () => {
      const newService: Omit<ServiceConfig, 'id'> = {
        name: 'Test Service',
        description: 'A test service',
        category: 'testing',
        price: 100,
        currency: 'USD',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const created = await storageService.create('services', newService);
      expect(created).toHaveProperty('id');
      expect(created.name).toBe('Test Service');

      const retrieved = await storageService.getById('services', created.id);
      expect(retrieved).toBeTruthy();
      expect(retrieved?.name).toBe('Test Service');
    });

    test('should update items', async () => {
      const newService: Omit<ServiceConfig, 'id'> = {
        name: 'Test Service',
        description: 'A test service',
        category: 'testing',
        price: 100,
        currency: 'USD',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const created = await storageService.create('services', newService);
      const updated = await storageService.update('services', created.id, {
        name: 'Updated Service',
        price: 150,
      });

      expect(updated?.name).toBe('Updated Service');
      expect(updated?.price).toBe(150);
    });

    test('should delete items', async () => {
      const newService: Omit<ServiceConfig, 'id'> = {
        name: 'Test Service',
        description: 'A test service',
        category: 'testing',
        price: 100,
        currency: 'USD',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const created = await storageService.create('services', newService);
      const deleted = await storageService.delete('services', created.id);
      expect(deleted).toBe(true);

      const retrieved = await storageService.getById('services', created.id);
      expect(retrieved).toBeNull();
    });

    test('should query items with filter', async () => {
      const service1: Omit<ServiceConfig, 'id'> = {
        name: 'Active Service',
        description: 'An active service',
        category: 'testing',
        price: 100,
        currency: 'USD',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const service2: Omit<ServiceConfig, 'id'> = {
        name: 'Inactive Service',
        description: 'An inactive service',
        category: 'testing',
        price: 150,
        currency: 'USD',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await storageService.create('services', service1);
      await storageService.create('services', service2);

      const activeServices = await storageService.query(
        'services',
        (item) => item.isActive === true
      );

      expect(activeServices).toHaveLength(1);
      expect(activeServices[0].name).toBe('Active Service');
    });
  });

  describe('Firebase detection', () => {
    test('should detect Firebase configuration', () => {
      const isUsingFirebase = storageService.isUsingFirebase();
      expect(typeof isUsingFirebase).toBe('boolean');
    });
  });
});
