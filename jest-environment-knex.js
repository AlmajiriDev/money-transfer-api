import NodeEnvironment from 'jest-environment-node';

export default class KnexEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    // Force CommonJS for migration files
    this.global.module = module;
  }
}