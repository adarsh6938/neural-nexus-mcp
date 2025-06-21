import { pipeline } from '@xenova/transformers';
import { logger } from '../utils/logger.js';
import {
  EmbeddingService,
  type EmbeddingModelInfo,
  type EmbeddingProviderInfo,
} from './EmbeddingService.js';
import type { EmbeddingServiceConfig } from './EmbeddingServiceFactory.js';

/**
 * Local embedding service using Transformers.js
 * Uses the all-MiniLM-L6-v2 model for high-quality embeddings
 */
export class TransformersEmbeddingService extends EmbeddingService {
  private pipeline: any | null = null;
  private modelName: string;
  private dimensions: number;
  private maxTokens: number;
  private isInitialized = false;

  constructor(config?: EmbeddingServiceConfig) {
    super();

    // Default to all-MiniLM-L6-v2 model (384 dimensions)
    this.modelName = config?.model || 'Xenova/all-MiniLM-L6-v2';
    this.dimensions = config?.dimensions || 384;
    this.maxTokens = config?.maxTokens || 512;

    logger.info('TransformersEmbeddingService initialized', {
      model: this.modelName,
      dimensions: this.dimensions,
      maxTokens: this.maxTokens,
    });
  }

  /**
   * Initialize the embedding pipeline
   */
  private async initializePipeline(): Promise<void> {
    if (this.isInitialized && this.pipeline) {
      return;
    }

    try {
      logger.info('Loading Transformers.js model...', { model: this.modelName });

      // Create the feature extraction pipeline
      this.pipeline = await pipeline('feature-extraction', this.modelName, {
        // Cache models locally
        cache_dir: './models',
        // Use local files if available
        local_files_only: false,
      });

      this.isInitialized = true;
      logger.info('Transformers.js model loaded successfully', { model: this.modelName });
    } catch (error) {
      logger.error('Failed to initialize Transformers.js pipeline', error);
      throw new Error(`Failed to load model ${this.modelName}: ${error}`);
    }
  }

  /**
   * Generate embedding for a single text
   */
  override async generateEmbedding(text: string): Promise<number[]> {
    await this.initializePipeline();

    if (!this.pipeline) {
      throw new Error('Pipeline not initialized');
    }

    try {
      // Truncate text if too long
      const truncatedText = this.truncateText(text);

      // Generate embedding
      const result = await this.pipeline(truncatedText, {
        pooling: 'mean',
        normalize: true,
      });

      // Extract the embedding array
      let embedding: number[];

      if (Array.isArray(result) && result.length > 0) {
        // Handle different output formats
        if (Array.isArray(result[0])) {
          embedding = result[0] as number[];
        } else {
          embedding = result as number[];
        }
      } else if (result && typeof result === 'object' && 'data' in result) {
        // Handle tensor-like objects
        embedding = Array.from(result.data as number[]);
      } else {
        throw new Error('Unexpected embedding result format');
      }

      // Verify dimensions
      if (embedding.length !== this.dimensions) {
        logger.warn('Embedding dimension mismatch', {
          expected: this.dimensions,
          actual: embedding.length,
          text: truncatedText.substring(0, 50) + '...',
        });
      }

      return embedding;
    } catch (error) {
      logger.error('Failed to generate embedding', { error, text: text.substring(0, 100) });
      throw new Error(`Embedding generation failed: ${error}`);
    }
  }

  /**
   * Generate embeddings for multiple texts
   */
  override async generateEmbeddings(texts: string[]): Promise<number[][]> {
    await this.initializePipeline();

    if (!this.pipeline) {
      throw new Error('Pipeline not initialized');
    }

    try {
      // Process each text individually for more reliable results
      const embeddings: number[][] = [];

      for (const text of texts) {
        const embedding = await this.generateEmbedding(text);
        embeddings.push(embedding);
      }

      return embeddings;
    } catch (error) {
      logger.error('Failed to generate batch embeddings', { error, count: texts.length });
      throw new Error(`Batch embedding generation failed: ${error}`);
    }
  }

  /**
   * Get model information
   */
  override getModelInfo(): EmbeddingModelInfo {
    return {
      name: this.modelName,
      dimensions: this.dimensions,
      version: '1.0.0',
    };
  }

  /**
   * Get provider information
   */
  override getProviderInfo(): EmbeddingProviderInfo {
    return {
      provider: 'transformers',
      model: this.modelName,
      dimensions: this.dimensions,
    };
  }

  /**
   * Truncate text to fit within model limits
   */
  private truncateText(text: string): string {
    // Simple word-based truncation
    const words = text.split(' ');

    if (words.length <= this.maxTokens) {
      return text;
    }

    const truncated = words.slice(0, this.maxTokens).join(' ');
    logger.debug('Text truncated for embedding', {
      originalLength: words.length,
      truncatedLength: this.maxTokens,
    });

    return truncated;
  }

  /**
   * Clean up resources
   */
  async dispose(): Promise<void> {
    if (this.pipeline) {
      // Transformers.js doesn't have explicit cleanup, but we can null the reference
      this.pipeline = null;
      this.isInitialized = false;
      logger.info('TransformersEmbeddingService disposed');
    }
  }
}
