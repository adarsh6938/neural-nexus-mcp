/**
 * Integration tests for embedding services
 * These tests verify that different embedding providers work correctly together
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EmbeddingServiceFactory } from '../EmbeddingServiceFactory.js';
import { TransformersEmbeddingService } from '../TransformersEmbeddingService.js';
import { DefaultEmbeddingService } from '../DefaultEmbeddingService.js';

describe('EmbeddingServiceIntegration', () => {
  // Skip tests if in CI environment without proper setup
  const isCI = process.env.CI === 'true';
  const useMockEmbeddings = process.env.MOCK_EMBEDDINGS === 'true';

  beforeEach(() => {
    // Reset the factory registry before each test
    EmbeddingServiceFactory.resetRegistry();
  });

  describe('EmbeddingServiceFactory', () => {
    it('should create transformers service by default', () => {
      const service = EmbeddingServiceFactory.createFromEnvironment();
      expect(service).toBeInstanceOf(TransformersEmbeddingService);
    });

    it('should create mock service when MOCK_EMBEDDINGS=true', () => {
      // Temporarily set mock embeddings
      const originalMock = process.env.MOCK_EMBEDDINGS;
      process.env.MOCK_EMBEDDINGS = 'true';

      const service = EmbeddingServiceFactory.createFromEnvironment();
      expect(service).toBeInstanceOf(DefaultEmbeddingService);

      // Restore original value
      if (originalMock !== undefined) {
        process.env.MOCK_EMBEDDINGS = originalMock;
      } else {
        delete process.env.MOCK_EMBEDDINGS;
      }
    });

    it('should register and use custom providers', () => {
      // Register a custom provider
      EmbeddingServiceFactory.registerProvider('custom', () => {
        return new DefaultEmbeddingService(512);
      });

      const service = EmbeddingServiceFactory.createService({
        provider: 'custom',
      });

      expect(service).toBeInstanceOf(DefaultEmbeddingService);
      expect(service.getModelInfo().dimensions).toBe(512);
    });
  });

  describe('Service Compatibility', () => {
    it('should handle different dimension requirements', async () => {
      const service384 = new TransformersEmbeddingService({ dimensions: 384 });
      const service768 = new DefaultEmbeddingService(768);

      const text = 'test embedding compatibility';

      const embedding384 = await service384.generateEmbedding(text);
      const embedding768 = await service768.generateEmbedding(text);

      expect(embedding384.length).toBe(384);
      expect(embedding768.length).toBe(768);
    });

    it('should maintain consistent model info format', () => {
      const transformersService = new TransformersEmbeddingService();
      const defaultService = new DefaultEmbeddingService();

      const transformersInfo = transformersService.getModelInfo();
      const defaultInfo = defaultService.getModelInfo();

      // Both should have the same structure
      expect(transformersInfo).toHaveProperty('name');
      expect(transformersInfo).toHaveProperty('dimensions');
      expect(transformersInfo).toHaveProperty('provider');

      expect(defaultInfo).toHaveProperty('name');
      expect(defaultInfo).toHaveProperty('dimensions');
      expect(defaultInfo).toHaveProperty('provider');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid provider gracefully', () => {
      expect(() => {
        EmbeddingServiceFactory.createService({
          provider: 'nonexistent',
        });
      }).toThrow('Provider "nonexistent" is not registered');
    });

    it('should fallback to default when transformers fails', () => {
      // Mock TransformersEmbeddingService to throw
      vi.doMock('../TransformersEmbeddingService.js', () => ({
        TransformersEmbeddingService: vi.fn().mockImplementation(() => {
          throw new Error('Transformers not available');
        }),
      }));

      // This should fallback to DefaultEmbeddingService
      const service = EmbeddingServiceFactory.createFromEnvironment();
      expect(service).toBeInstanceOf(DefaultEmbeddingService);
    });
  });
});
