import type { EmbeddingService } from './EmbeddingService.js';
import { DefaultEmbeddingService } from './DefaultEmbeddingService.js';
import { OpenAIEmbeddingService } from './OpenAIEmbeddingService.js';
import { TransformersEmbeddingService } from './TransformersEmbeddingService.js';
import { logger } from '../utils/logger.js';

/**
 * Configuration options for embedding services
 */
export interface EmbeddingServiceConfig {
  provider?: string;
  model?: string;
  dimensions?: number;
  apiKey?: string;
  maxTokens?: number;
  version?: string | number;
  [key: string]: unknown;
}

/**
 * Type definition for embedding service provider creation function
 */
type EmbeddingServiceProvider = (config?: EmbeddingServiceConfig) => EmbeddingService;

/**
 * Factory for creating embedding services
 */
export class EmbeddingServiceFactory {
  /**
   * Registry of embedding service providers
   */
  private static providers: Record<string, EmbeddingServiceProvider> = {};

  /**
   * Register a new embedding service provider
   *
   * @param name - Provider name
   * @param provider - Provider factory function
   */
  static registerProvider(name: string, provider: EmbeddingServiceProvider): void {
    EmbeddingServiceFactory.providers[name.toLowerCase()] = provider;
  }

  /**
   * Reset the provider registry - used primarily for testing
   */
  static resetRegistry(): void {
    EmbeddingServiceFactory.providers = {};
  }

  /**
   * Get a list of available provider names
   *
   * @returns Array of provider names
   */
  static getAvailableProviders(): string[] {
    return Object.keys(EmbeddingServiceFactory.providers);
  }

  /**
   * Create a service using a registered provider
   *
   * @param config - Configuration options including provider name and service-specific settings
   * @returns The created embedding service
   * @throws Error if the provider is not registered
   */
  static createService(config: EmbeddingServiceConfig = {}): EmbeddingService {
    const providerName = (config.provider || 'transformers').toLowerCase();
    logger.debug(`EmbeddingServiceFactory: Creating service with provider "${providerName}"`);

    const providerFn = EmbeddingServiceFactory.providers[providerName];

    if (providerFn) {
      try {
        const service = providerFn(config);
        logger.debug(
          `EmbeddingServiceFactory: Service created successfully with provider "${providerName}"`,
          {
            modelInfo: service.getModelInfo(),
          }
        );
        return service;
      } catch (error) {
        logger.error(
          `EmbeddingServiceFactory: Failed to create service with provider "${providerName}"`,
          error
        );
        throw error;
      }
    }

    // If provider not found, throw an error
    logger.error(`EmbeddingServiceFactory: Provider "${providerName}" is not registered`);
    throw new Error(`Provider "${providerName}" is not registered`);
  }

  /**
   * Create an embedding service from environment variables
   *
   * @returns An embedding service implementation
   */
  static createFromEnvironment(): EmbeddingService {
    // Check if we should use mock embeddings (for testing)
    const useMockEmbeddings = process.env.MOCK_EMBEDDINGS === 'true';
    const embeddingProvider = process.env.EMBEDDING_PROVIDER?.toLowerCase() || 'transformers';

    logger.debug('EmbeddingServiceFactory: Creating service from environment variables', {
      mockEmbeddings: useMockEmbeddings,
      provider: embeddingProvider,
      openaiKeyPresent: !!process.env.OPENAI_API_KEY,
      embeddingModel: process.env.OPENAI_EMBEDDING_MODEL || 'default',
    });

    if (useMockEmbeddings) {
      logger.info('EmbeddingServiceFactory: Using mock embeddings for testing');
      return new DefaultEmbeddingService();
    }

    // Prioritize local embeddings (Transformers.js) over OpenAI
    if (embeddingProvider === 'transformers' || embeddingProvider === 'local') {
      try {
        logger.debug('EmbeddingServiceFactory: Creating local Transformers embedding service');
        const service = new TransformersEmbeddingService({
          model: process.env.TRANSFORMERS_MODEL || 'Xenova/all-MiniLM-L6-v2',
          dimensions: process.env.TRANSFORMERS_DIMENSIONS
            ? parseInt(process.env.TRANSFORMERS_DIMENSIONS, 10)
            : 384,
          maxTokens: process.env.TRANSFORMERS_MAX_TOKENS
            ? parseInt(process.env.TRANSFORMERS_MAX_TOKENS, 10)
            : 512,
        });
        logger.info('EmbeddingServiceFactory: Local Transformers embedding service created', {
          model: service.getModelInfo().name,
          dimensions: service.getModelInfo().dimensions,
        });
        return service;
      } catch (error) {
        logger.error('EmbeddingServiceFactory: Failed to create Transformers service', error);
        logger.info('EmbeddingServiceFactory: Falling back to default embedding service');
        return new DefaultEmbeddingService();
      }
    }

    // OpenAI as fallback option
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const embeddingModel = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';

    if (embeddingProvider === 'openai' && openaiApiKey) {
      try {
        logger.debug('EmbeddingServiceFactory: Creating OpenAI embedding service', {
          model: embeddingModel,
        });
        const service = new OpenAIEmbeddingService({
          apiKey: openaiApiKey,
          model: embeddingModel,
        });
        logger.info('EmbeddingServiceFactory: OpenAI embedding service created successfully', {
          model: service.getModelInfo().name,
          dimensions: service.getModelInfo().dimensions,
        });
        return service;
      } catch (error) {
        logger.error('EmbeddingServiceFactory: Failed to create OpenAI service', error);
        logger.info('EmbeddingServiceFactory: Falling back to default embedding service');
        return new DefaultEmbeddingService();
      }
    }

    // Default fallback: use local transformers without API keys
    try {
      logger.info('EmbeddingServiceFactory: Using local Transformers as default (no API keys)');
      return new TransformersEmbeddingService();
    } catch (error) {
      logger.error('EmbeddingServiceFactory: Failed to create default Transformers service', error);
      logger.info('EmbeddingServiceFactory: Using mock embeddings as final fallback');
      return new DefaultEmbeddingService();
    }
  }

  /**
   * Create a local Transformers.js embedding service
   *
   * @param model - Optional model name
   * @param dimensions - Optional embedding dimensions
   * @param maxTokens - Optional max tokens
   * @returns Transformers embedding service
   */
  static createTransformersService(
    model?: string,
    dimensions?: number,
    maxTokens?: number
  ): EmbeddingService {
    return new TransformersEmbeddingService({
      model,
      dimensions,
      maxTokens,
    });
  }

  /**
   * Create an OpenAI embedding service
   *
   * @param apiKey - OpenAI API key
   * @param model - Optional model name
   * @param dimensions - Optional embedding dimensions
   * @returns OpenAI embedding service
   */
  static createOpenAIService(
    apiKey: string,
    model?: string,
    dimensions?: number
  ): EmbeddingService {
    return new OpenAIEmbeddingService({
      apiKey,
      model,
      dimensions,
    });
  }

  /**
   * Create a default embedding service that generates random vectors
   *
   * @param dimensions - Optional embedding dimensions
   * @returns Default embedding service
   */
  static createDefaultService(dimensions?: number): EmbeddingService {
    return new DefaultEmbeddingService(dimensions);
  }
}

// Register built-in providers
EmbeddingServiceFactory.registerProvider('default', (config = {}) => {
  return new DefaultEmbeddingService(config.dimensions);
});

EmbeddingServiceFactory.registerProvider('transformers', (config = {}) => {
  return new TransformersEmbeddingService(config);
});

EmbeddingServiceFactory.registerProvider('local', (config = {}) => {
  return new TransformersEmbeddingService(config);
});

EmbeddingServiceFactory.registerProvider('openai', (config = {}) => {
  if (!config.apiKey) {
    throw new Error('API key is required for OpenAI embedding service');
  }

  return new OpenAIEmbeddingService({
    apiKey: config.apiKey,
    model: config.model,
    dimensions: config.dimensions,
  });
});
