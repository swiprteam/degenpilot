export abstract class Serializable<SerializableData> {
  toObject(): Partial<SerializableData> {
    return Object.assign({}, this);
  }
  toString(): string {
    return JSON.stringify(this.toObject());
  }
}
