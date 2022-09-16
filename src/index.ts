import { SVGGenerator } from './svg-generator';
import type { PublicConfig } from './types';

function generateSVG(config: PublicConfig) {
  new SVGGenerator(config).init();
}

export { generateSVG };
