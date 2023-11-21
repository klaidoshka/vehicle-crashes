export default interface IFormDeleteModuleProperties {
  description: string;
  handleDelete: () => void | Promise<void>;
  title: string;
}
