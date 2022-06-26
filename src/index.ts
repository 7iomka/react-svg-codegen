import { SVGGenerator } from './svg-generator';
import type { Config } from './types';

function generateSVG(config: Config) {
  new SVGGenerator(config).init();
}

export { generateSVG };
